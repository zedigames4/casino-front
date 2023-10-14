import endpoints from './endpoints';

const Constants = {
  endpoints,
  BACKEND_URL: process.env.DEFAULT_API,
};

export default Constants;

export const allowedRoles = ['admin', 'manager'];
