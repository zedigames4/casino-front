import { INavItems } from '@/interfaces/nav.interface';

export const publicNavItems: INavItems[] = [
  {
    iconName: 'home',
    label: 'Home',
    path: '/',
  },
  {
    iconName: 'group_work',
    label: 'Games',
    path: '/about',
  },
  {
    iconName: 'model_training',
    label: 'Trainings',
    path: '/trainings',
  },
  {
    iconName: 'apartment',
    label: 'Hospitality',
    path: '/hospitality',
  },
  {
    iconName: 'calendar_month',
    label: 'Events',
    path: '/events',
  },
  {
    iconName: 'rss_feed',
    label: 'Blog',
    path: '/blog',
  },
  {
    iconName: 'work',
    label: 'Apply Now',
    path: '/jobs',
  },
  {
    iconName: 'account_circle',
    label: 'Login',
    path: '/login',
  },
];
