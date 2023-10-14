import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import Link from 'next/link';
import Image from 'next/image';
import { useProfile } from '@/modules/context/ProfileContext';
import { UserProfileInterface } from '@/interfaces/profile.interface';
import Http from '@/utils/http';
import endpoints from '@/utils/constants/endpoints';
import AddOrEditUser from '@/modules/activities/_partials/users/AddOrEditUser';
import EditProfile from '@/modules/activities/_partials/profile/EditProfile';
import UploadAvatar from '@/modules/activities/_partials/profile/UploadAvatar';
import { useWallet } from '@/modules/context/WalletContext';
import Modal from '@/components/Modal';
import PopupWallet from '@/modules/activities/_partials/wallet/PopupWallet';
import Referrals from '@/components/Referrals';
import { scrollElementIntoView } from '@/utils/helpers/scroll';

const ProfileActivity = ({ id }: { id: string | null }) => {
  const [profile, setProfile] = useState<UserProfileInterface | null>(null);
  const { profile: personalInfo, setProfile: setPersonalInfo } = useProfile();
  const [isMe, setIsMe] = useState(false);
  const { wallet: meWallet } = useWallet();
  const router = useRouter();
  useEffect(() => {
    if (!id) {
      setIsMe(true);
      setProfile(personalInfo);
    } else {
      Http.axios
        .get(`${endpoints.USERS}/${id}`)
        .then(response => {
          const {
            data: { data },
          } = response;
          setProfile(data);
        })
        .catch((err: any) => {
          console.error(err);
          swal('user not found', ` we can't find user with ${id} id !`, 'error')
            .then(() => {
              router.push('/profile').catch(e => console.error(e));
            })
            .catch(er => console.error(er));
        });
      setIsMe(false);
    }
  }, [id, personalInfo]);

  useEffect(() => {
    if (personalInfo && !personalInfo.referralCode) {
      Http.axios
        .patch(endpoints.REFERRAL_CODE)
        .then(res => {
          const {
            data: { referralCode },
          } = res;
          setPersonalInfo((i: any) => ({ ...i, referralCode }));
        })
        .catch(error => console.error(error));
    }
  }, [personalInfo]);
  return (
    <div id="profileTop">
      <button
        type="button"
        onClick={() => {
          scrollElementIntoView('#referrals');
        }}
        className="text-white self-start px-4 py-2 mx-2 rounded-lg bg-brand-blue-light flex items-center"
      >
        <span className="material-icons p-2"> arrow_downward</span>
        <span>go to Referrals</span>
      </button>
      <div className="container mx-auto sm:px-4 container-profile">
        <div className="card-profile">
          <div className="header-profile">
            {isMe ? (
              <EditProfile updateUser={setProfile} user={profile}>
                <span className=" hamburger-menu bg-red material-icons text-xl center z-60 text-white">
                  edit
                </span>
              </EditProfile>
            ) : (
              <AddOrEditUser
                updateUser={setProfile}
                removeUser={() => {
                  router.push('/users').catch(er => console.error(er));
                }}
                user={profile}
              >
                <span className=" hamburger-menu bg-red material-icons text-xl center z-60 text-white">
                  edit
                </span>
              </AddOrEditUser>
            )}

            <div className="main">
              <UploadAvatar
                onUpload={avatar => {
                  setProfile((i: any) => {
                    return { ...i, avatar };
                  });
                }}
              >
                {profile?.avatar ? (
                  <Image
                    className="hover:opacity-70 rounded-full"
                    src={profile.avatar}
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="image-prifile">
                    <i className="fas fa-camera fa-2x" />
                  </div>
                )}
              </UploadAvatar>
              <h3 className="name">{profile?.firstName}</h3>
              <h3 className="sub-name">{profile?.lastName}</h3>
            </div>
          </div>
          <div className="left pb-12 px-10">
            <div className="about-container">
              <div className="flex justify-between mb-12">
                <h3 className="title">About</h3>
                <div className="right">
                  <div>
                    <h3 className="number">
                      {isMe
                        ? meWallet?.balance?.toFixed(1)
                        : profile?.balance?.toFixed(0)}
                    </h3>
                    <h3 className="number-title">RWF</h3>
                    <h3 className="number-title">Balance</h3>
                  </div>
                </div>
              </div>

              <div className="text-black/40 flex flex-wrap justify-between">
                <p className=" flex-1 px-4">Email</p>
                <p className=" flex-1 px-4">{profile?.email}</p>
              </div>
              <div className="text-black/40 flex flex-wrap justify-between">
                <p className="px-4">Phone</p>
                <p className="px-4">{profile?.phoneNumber}</p>
              </div>
              <div className="text-black/40 flex flex-wrap justify-between">
                <p className=" px-4">Income</p>
                <p className=" px-4">{profile?.income}</p>
              </div>
              <div className="text-black/40 flex flex-wrap justify-between">
                <p className=" px-4">Role</p>
                <p className=" px-4">{profile?.role}</p>
              </div>
              <div className="text-black/40 flex flex-wrap justify-between">
                <p className=" px-4">Created At</p>
                <p className=" px-4">
                  {new Date(String(profile?.createdAt)).toDateString()}
                </p>
              </div>

              <div className="text-black/40 flex flex-wrap justify-between mt-6">
                <p className=" px-4">Referral Code</p>
                <p className=" px-4">{profile?.referralCode}</p>
              </div>
            </div>

            {isMe && (
              <div className="flex justify-between pt-6">
                <div className="follow-wrap">
                  <Modal
                    toggle={<span className="follow">Top up</span>}
                    header={
                      <div className="flex gap-5">
                        <h3 className="text-3xl text-black font-semibold">
                          Top up wallet
                        </h3>
                      </div>
                    }
                  >
                    <div className="flex items-center w-full py-4 z-60 justify-center">
                      <PopupWallet />
                    </div>
                  </Modal>
                </div>
                <div className="share-wrap">
                  <Link href="/wallet/#request_withdraw_div">
                    <a href="#add" className="share">
                      Withdraw
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Referrals
        onSingleClick={user => {
          if (profile?.role === 'admin') {
            router
              .push(`/profile?id=${user._id}`)
              .then(() => {
                scrollElementIntoView('#profileTop');
              })
              .catch(err => console.error(err));
          }
        }}
        className="text-white"
        id="referrals"
        userId={profile?._id}
      />
    </div>
  );
};

export default ProfileActivity;
