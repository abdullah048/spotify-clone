'use client';
import * as RadixSlider from '@radix-ui/react-slider';
import { useEffect, useState } from 'react';

type Props = {
  value?: number;
  onChange?: (value: number) => void;
  duration: number;
};

const PlayerProgressbar = ({ value = 0, onChange, duration }: Props) => {
  const [progress, setProgress] = useState(0);
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = progress + 0.1;
      setProgress(currentTime);
      if (currentTime === duration) {
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [progress, duration]);

  return (
    <RadixSlider.Root
      className='relative flex items-center select-none touch-none w-full h-10'
      defaultValue={[0]}
      value={[progress]}
      onValueChange={handleChange}
      max={duration}
      step={0.1}
      aria-label='volume'>
      <RadixSlider.Track className='bg-neutral-600 relative grow rounded-full h-[3px]'>
        <RadixSlider.Range className='absolute bg-white rounded-full h-full' />
      </RadixSlider.Track>
      <RadixSlider.Thumb className='flex w-[15px] h-[15px] bg-white shadow-md rounded-full' />
    </RadixSlider.Root>
  );
};

export default PlayerProgressbar;
