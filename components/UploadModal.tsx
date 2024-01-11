'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import useUploadModalStore from '@/hooks/useUploadModalStore';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './Input';

type Props = {};

const UploadModal = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useUploadModalStore();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async values => {
    // TODO: Upload to supabase.
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
          type='text'
          id='title'
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder='Song title'
        />
        <Input
          type='text'
          id='author'
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder='Song author'
        />
        <div>
          <div className='pb-1'>Select a song file</div>
          <Input
            type='file'
            id='song'
            disabled={isLoading}
            {...register('song', { required: true })}
            accept='.mp3'
          />
        </div>
      </form>
    </Modal>
  );
};

export default UploadModal;
