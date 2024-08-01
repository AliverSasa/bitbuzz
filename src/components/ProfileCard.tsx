import { useQuery } from '@tanstack/react-query';
import { btcConnectorAtom } from '../store/user';
import { useAtomValue } from 'jotai';
import { environment } from '../utils/environments';
import { isEmpty } from 'ramda';
import { fetchFollowerList, fetchFollowingList } from '../api/buzz';
import CustomAvatar from './CustomAvatar';

type Iprops = {
  address: string;
};

const ProfileCard = ({ address }: Iprops) => {
  const btcConnector = useAtomValue(btcConnectorAtom);
  console.log('btcConnector', btcConnector);
  const profileUserData = useQuery({
    queryKey: ['userInfo', address, environment.network],
    queryFn: () =>
      btcConnector?.getUser({
        network: environment.network,
        currentAddress: address,
      }),
  });

  const { data: followingListData } = useQuery({
    queryKey: ['following', profileUserData?.data?.metaid],
    enabled: !isEmpty(profileUserData?.data?.metaid ?? ''),
    queryFn: () =>
      fetchFollowingList({
        metaid: profileUserData?.data?.metaid ?? '',
        params: { cursor: '0', size: '5', followDetail: false },
      }),
  });

  const { data: followerListData } = useQuery({
    queryKey: ['follower', profileUserData?.data?.metaid],
    enabled: !isEmpty(profileUserData?.data?.metaid ?? ''),
    queryFn: () =>
      fetchFollowerList({
        metaid: profileUserData?.data?.metaid ?? '',
        params: { cursor: '0', size: '5', followDetail: false },
      }),
  });

  const metaidPrefix = (profileUserData?.data?.metaid ?? '').slice(0, 6);

  return (
    <div className='border w-full border-white rounded-xl relative pt-[100px] md:pt-[170px]'>
      <img src='/banana_logo.png' className='absolute top-0 left-[45%] w-32 h-32' />
      <div className='flex justify-between p-6'>
        <div className='flex flex-col gap-2 items-center '>
          <CustomAvatar userInfo={profileUserData?.data} size='80px' />
          <div className='font-bold font-mono text-[12px] md:text-[24px] '>
            {profileUserData?.data?.name ?? `MetaID-User-${metaidPrefix}`}
          </div>
          <div className='flex gap-2 text-[12px] md:text-[14px] '>
            <div className='text-main'>{`MetaID:  ${metaidPrefix}`}</div>
            {/* <a
              className='btn btn-xs bg-main text-[black] hover:text-main hover:bg-[black]'
              target='_blank'
              href=''
            >
              TX
            </a> */}
          </div>
        </div>

        <div className='flex self-center mt-10 text-[12px] md:text-[14px]'>
          <div className='flex gap-1'>
            <div className='text-main'>{followingListData?.total ?? 0}</div>
            <div className='text-[#A4A59D]'>Following</div>
          </div>
          <div className='border-r border-[#A4A59D] border mx-3'></div>
          <div className='flex gap-1'>
            <div className='text-main'>{followerListData?.total ?? 0}</div>
            <div className='text-[#A4A59D]'>Followers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
