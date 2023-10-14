export interface INavItems {
  iconName: string;
  label: string;
  path: string;
  guestOnly?: boolean;
  adminOnly?: boolean;
  staffOnly?: boolean;
  requireLogin?: boolean;
}

export const defaultNavItems: INavItems[] = [
  {
    iconName: 'home',
    label: 'Home',
    path: '/',
  },
];

export const pages: INavItems[] = [
  {
    label: 'Login',
    path: 'login',
    iconName: '',
    guestOnly: true,
  },
  {
    label: 'Signup',
    path: 'login?sign_up=true',
    iconName: '',
    guestOnly: true,
  },
  {
    label: 'Dashboard',
    path: 'dashboard',
    iconName: '',
    requireLogin: true,
  },
  {
    label: 'Wallet',
    path: 'wallet',
    iconName: '',
    requireLogin: true,
  },
  {
    label: 'Game...',
    path: 'games',
    iconName: '',
    requireLogin: true,
  },
  {
    label: 'Users',
    path: 'users',
    iconName: '',
    staffOnly: true,
  },
  {
    label: 'Help',
    path: 'help',
    iconName: '',
  },
  // {
  //   label: 'Notifications',
  //   path: 'notifications',
  //   iconName: '',
  //   requireLogin: true,
  // },
];
