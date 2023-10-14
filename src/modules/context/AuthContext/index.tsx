import { useRouter } from 'next/router';
import React from 'react';
import isAuth from '@/utils/helpers/isAuth';
import Secure from '@/utils/helpers/secureLs';
import Keys from '@/utils/constants/keys';

export interface IUser {
  _id: number;
  role: string;
  firstName: string;
  email: string;
}
export interface IAuth {
  user: IUser | null;
}

export const defaultValue: Readonly<IAuth> = {
  user: null,
};

export const AuthContext = React.createContext<IAuth>(defaultValue);
export const useAuth = () => {
  return React.useContext(AuthContext);
};

interface IAuthProvider {
  children: React.ReactNode;
  isProtected: boolean;
  guest: boolean;
  allowedRoles: number[];
}

const AuthProvider = ({
  children,
  isProtected = false,
  allowedRoles,
  guest = false,
}: IAuthProvider) => {
  const [user, setUser] = React.useState(null);

  const router = useRouter();

  const redirectTo = (path = '/login') => {
    router.push(path);
  };

  const checkAuth = React.useRef(() => {});
  checkAuth.current = () => {
    const authUser = isAuth();
    if (authUser) {
      setUser(authUser);
    } else {
      setUser(null);
    }
    if (guest && authUser) {
      const pathname = Secure.get(Keys.REDIRECT_LINK);
      redirectTo(pathname || '/');
      if (pathname) {
        Secure.remove(Keys.REDIRECT_LINK);
      }
    } else if (isProtected && !authUser) {
      if (!router.asPath.includes('/logout')) {
        Secure.set(Keys.REDIRECT_LINK, router.asPath);
      }
      redirectTo('/login');
    } else if (allowedRoles && !allowedRoles.includes(authUser.role)) {
      if (!router.asPath.includes('/logout')) {
        Secure.set(Keys.REDIRECT_LINK, router.asPath);
      }
      redirectTo('/401');
    }
  };

  React.useEffect(() => {
    checkAuth.current();
  }, [guest, allowedRoles, isProtected]);

  const value = React.useMemo(() => {
    return {
      user,
    };
  }, [user]);

  return (
    <AuthContext.Provider value={value}>
      {isProtected && !user ? (
        <div className="flex flex-col min-h-screen text-center justify-center text-sm">
          Loading...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
