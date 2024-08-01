/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingOverlay from 'react-loading-overlay-ts';
import { useState } from 'react';
import { useEffect } from 'react';

import { toast } from 'react-toastify';
import { useAtom, useAtomValue } from 'jotai';
import { globalFeeRateAtom, userInfoAtom } from '../../store/user';
import EditMetaIdInfoForm from './EditMetaIdInfoForm';
import { useQueryClient } from '@tanstack/react-query';
import { IBtcConnector } from '@metaid/metaid';
import { MetaidUserInfo } from './CreateMetaIDFormWrap';
import { environment } from '../../utils/environments';

// export type MetaidUserInfo = {
// 	name: string;
// 	bio?: string;
// 	avatar?: string;
// };

type Iprops = {
  btcConnector: IBtcConnector;
};

const EditMetaIDFormWrap = ({ btcConnector }: Iprops) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const globalFeeRate = useAtomValue(globalFeeRateAtom);
  const [userInfoStartValues, setUserInfoStartValues] =
    useState<MetaidUserInfo>({
      name: userInfo?.name ?? '',
      bio: userInfo?.bio ?? '',
      avatar: userInfo?.avatar ?? undefined,
    });

  useEffect(() => {
    setUserInfoStartValues({
      name: userInfo?.name ?? '',
      bio: userInfo?.bio ?? '',
      avatar: userInfo?.avatar ?? undefined,
    });
  }, [userInfo]);

  const queryClient = useQueryClient();
  // console.log("userInfo", userInfo);
  const handleEditMetaID = async (userInfo: MetaidUserInfo) => {
    setIsEditing(true);

    const res = await btcConnector
      .updateUserInfo({
        userData: { ...userInfo },
        options: {
          feeRate: Number(globalFeeRate),
          network: environment.network,
          service: {
            address: environment.service_address,
            satoshis: environment.service_staoshi,
          },
        },
      })
      .catch((error: any) => {
        console.log('error', error);
        const errorMessage = (error as any)?.message ?? error;
        const toastMessage = errorMessage?.includes(
          'Cannot read properties of undefined'
        )
          ? 'User Canceled'
          : errorMessage;
        toast.error(toastMessage, {
          className:
            '!text-[#DE613F] !bg-[black] border border-[#DE613f] !rounded-lg',
        });
        setIsEditing(false);
        setUserInfoStartValues(userInfoStartValues);
        //   console.log('error get user', await btcConnector.getUser());
        //   setUserInfo(await btcConnector.getUser());
      });
    console.log('update res', res);
    if (res) {
      console.log(
        'after create',
        await btcConnector.getUser({ network: environment.network })
      );
      setUserInfo(await btcConnector.getUser({ network: environment.network }));
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      toast.success('Updating Your Profile Successfully!');
    }

    setIsEditing(false);
    const doc_modal = document.getElementById(
      'edit_metaid_modal'
    ) as HTMLDialogElement;
    doc_modal.close();
  };

  return (
    <LoadingOverlay active={isEditing} spinner text='Updating profile...'>
      <EditMetaIdInfoForm
        onSubmit={handleEditMetaID}
        initialValues={userInfoStartValues}
      />
    </LoadingOverlay>
  );
};

export default EditMetaIDFormWrap;
