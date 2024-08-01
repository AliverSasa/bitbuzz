// import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
// import { getPinDetailByPid } from '../api/buzz';
import BackButton from '../components/Buttons/BackButton';
import AllNewBuzzList from '../components/BuzzList/AllNewBuzzList';
import { environment } from '../utils/environments';
import ProfileCard from '../components/ProfileCard';

// import BuzzCard from '../components/BuzzList/BuzzCard';

const Profile = () => {
  const { id: address } = useParams();

  console.log(address)
  return (
    <div>
      <BackButton />

      <ProfileCard address={address ?? ''} />

      <AllNewBuzzList
      // @ts-ignore
        address={address}
        queryKey={['buzzes', environment.network, address]}
      />
    </div>
  );
};

export default Profile;
