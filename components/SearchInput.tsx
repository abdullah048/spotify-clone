'use client';

import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import Input from './Input';

type Props = {};

const SearchInput = (props: Props) => {
  const router = useRouter();
  const [searchString, setSearchString] = useState('');
  const debouncedValue = useDebounce<string>(searchString);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };
    const url = queryString.stringifyUrl({
      url: '/search',
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      type='text'
      placeholder='What do you want to listen to?'
      value={searchString}
      onChange={handleOnChange}
    />
  );
};

export default SearchInput;
