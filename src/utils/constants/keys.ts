import * as process from 'process';

const Keys = {
  HOST: process.env.HOST || 'zeddi.com',
  DEFAULT_API: process.env.DEFAULT_API,
  REACT_APP_ACCESS_TOKEN: process.env.REACT_APP_ACCESS_TOKEN,
  ISSERVER: typeof window === 'undefined',
  TOKEN_DATA: process.env.TOKEN_DATA || 'TOKENdATA',
  USER_INFO: process.env.USER_INFO || 'USERiNFO',
  REDIRECT_LINK: process.env.REDIRECT_LINK || 'kllskdlUioioN82983&&&8923',
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
};

export default Keys;
