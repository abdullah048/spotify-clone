import { Song } from '@/typings';
import usePlayer from './usePlayerStore';
import useAuthModalStore from './useAuthModalStore';
import { useUser } from './useUser';
import useSubscriptionModal from './useSubscriptionModalStore';

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModalStore();
  const subscriptionModal = useSubscriptionModal();
  const { user, subscription } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen('sign_in');
    }

    if (!subscription) {
      return subscriptionModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map(song => song.id));
  };

  return onPlay;
};

export default useOnPlay;
