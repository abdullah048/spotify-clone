import { Song } from '@/typings';
import usePlayer from './usePlayerStore';
import useAuthModalStore from './useAuthModalStore';
import { useUser } from './useUser';

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModalStore();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen('sign_in');
    }

    player.setId(id);
    player.setIds(songs.map(song => song.id));
  };

  return onPlay;
};

export default useOnPlay;
