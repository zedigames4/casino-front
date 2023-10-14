import React from 'react';
import { UserProfileInterface } from '@/interfaces/profile.interface';
import Keys from '@/utils/constants/keys';
import Secure from '@/utils/helpers/secureLs';
import Http from '@/utils/http';
import endpoints from '@/utils/constants/endpoints';

export interface profileShape {
  profile: UserProfileInterface | null;
  setProfile: React.Dispatch<React.SetStateAction<UserProfileInterface | null>>;
}
export const defaultValue: Readonly<profileShape> = {
  profile: null,
  setProfile() {},
};
export const ProfileContext = React.createContext<profileShape>(defaultValue);
export const useProfile = () => {
  return React.useContext(ProfileContext);
};

const ProfileProvider = ({ children }: any) => {
  const [profile, setProfile] = React.useState<UserProfileInterface | null>(
    null,
  );

  React.useEffect(() => {
    Http.axios
      .get(endpoints.PROFILE)
      .then(response => {
        const {
          data: { data },
        } = response;
        setProfile(data);
      })
      .catch(er => {
        console.error(er);
        let user = Secure.get(Keys.USER_INFO as string);
        if (user) {
          user = JSON.parse(user);
          setProfile((prev: any) => {
            try {
              if (!prev) {
                return {
                  ...user,
                  createdAt: new Date(user.createdAt),
                  updatedAt: new Date(user.updatedAt),
                };
              }
              return prev;
            } catch (e) {
              console.error('profile context', e);
              return null;
            }
          });
        }
      });
  }, []);

  // fetching garages

  const value = React.useMemo(() => {
    return {
      profile,
      setProfile,
    };
  }, [profile]);

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;
