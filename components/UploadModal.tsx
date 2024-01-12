'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import useUploadModalStore from '@/hooks/useUploadModalStore';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';

type Props = {};

const UploadModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useUploadModalStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values, event) => {
    event?.preventDefault();
    const loadingToastId = toast.loading('Uploading song');
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        return;
      }

      const uniqueID = uniqid();

      // Upload song
      const { data: songData, error: songError } = await supabase.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        toast.dismiss(loadingToastId);
        return toast.error('Failed song upload!');
      }

      // Upload image
      const { data: imageData, error: imageError } = await supabase.storage
        .from('images')
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        toast.dismiss(loadingToastId);
        return toast.error('Failed image upload!');
      }

      const { error: supabaseError } = await supabase.from('songs').insert({
        user_id: user.id,
        title: values?.title,
        song_path: songData.path,
        image_path: imageData.path,
        author: values?.author,
      });

      if (supabaseError) {
        setIsLoading(false);
        toast.dismiss(loadingToastId);
        return toast.error(supabaseError.message ?? 'Something went wrong');
      }

      router.refresh();
      setIsLoading(false);
      toast.dismiss(loadingToastId);
      toast.success('Song created successfully');
      reset();
      onClose();
    } catch (error) {
      console.log('Error: =>', error);
      toast.dismiss(loadingToastId);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  return (
    <Modal
      title='Add a song'
      description='Upload an mp3 file'
      isOpen={isOpen}
      onChange={onChange}>
      <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          showError={errors?.title}
          type='text'
          id='title'
          disabled={isLoading}
          {...register('title', { required: 'Title is required' })}
          placeholder='Song title'
        />
        <Input
          showError={errors?.author}
          type='text'
          id='author'
          disabled={isLoading}
          {...register('author', { required: 'Author is required' })}
          placeholder='Song author'
        />
        <div>
          <div className='pb-1'>Select a song file</div>
          <Input
            showError={errors?.song}
            type='file'
            id='song'
            disabled={isLoading}
            {...register('song', { required: 'Song is required' })}
            accept='.mp3'
          />
        </div>
        <div>
          <div className='pb-1'>Select an image</div>
          <Input
            showError={errors?.image}
            type='file'
            id='image'
            disabled={isLoading}
            {...register('image', { required: 'Image is required' })}
            accept='image/*'
          />
        </div>
        <Button disabled={isLoading} type='submit'>
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
