import getSongByTitle from '@/actions/getSongBytitle';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import SearchContent from './components/SearchContent';

export const revalidate = 0;

type Props = {
  searchParams: {
    title: string;
  };
};

const Search = async ({ searchParams }: Props) => {
  const { title } = searchParams;

  const searchedSongs = await getSongByTitle(title);

  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
      <Header className='from-bg-neutral-900'>
        <div className='mb-2 flex flex-col gap-y-6'>
          <h1 className='text-white text-3xl font-semibold'>Search</h1>
          <SearchInput />
        </div>
      </Header>
      <div className='px-6'>
        <SearchContent songs={searchedSongs} />
      </div>
    </div>
  );
};

export default Search;
