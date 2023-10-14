/*
 * permissionLevel
 * -------------------------
 * 0: user,
 * 1: manager,
 * 2: admin
 * */
export const dashboardNavs = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    permissionLevel: 0,
  },
  {
    icon: 'account_circle',
    label: 'Profile',
    path: '/profile',
    permissionLevel: 0,
  },
  {
    icon: 'wallet',
    label: 'Wallet',
    path: '/wallet',
    permissionLevel: 0,
  },
  {
    icon: 'person',
    label: 'Users',
    path: '/users',
    permissionLevel: 1,
  },
  {
    icon: 'sports_esports',
    label: 'Games',
    path: '/games',
    permissionLevel: 0,
  },
  // {
  //   icon: 'notifications',
  //   label: 'Notification',
  //   path: '/notifications',
  //   permissionLevel: 0,
  // },
  // {
  //   icon: 'settings',
  //   label: 'Settings',
  //   path: '/settings',
  //   permissionLevel: 0,
  // },
  {
    icon: 'help',
    label: 'Help',
    path: '/help',
    permissionLevel: 0,
  },
];
