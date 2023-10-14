/* eslint-disable consistent-return */

export const set = (key, value) => {
  const ls = new SecureLS({ encodingType: 'aes' });
  if (typeof value !== 'string') {
    try {
      value = JSON.stringify(value);
    } catch (e) {
      console.error(e);
    }
  }
  ls.set(key, value);
};

const get = key => {
  const ls = new SecureLS({ encodingType: 'aes' });
  return ls.get(key);
};

export const remove = key => {
  const ls = new SecureLS({ encodingType: 'aes' });
  return ls.remove(key);
};

export const removeToken = async () => {
  const Keys = await import('./keys.js');
  const ls = new SecureLS({ encodingType: 'aes' });
  return ls.remove(`${Keys.default.REACT_APP_ACCESS_TOKEN}`);
};

export const setToken = async value => {
  const Keys = await import('./keys.js');
  const ls = new SecureLS({ encodingType: 'aes' });
  ls.set(`${Keys.default.REACT_APP_ACCESS_TOKEN}`, value);
};

export const getToken = async () => {
  const Keys = await import('./keys.js');
  const ls = new SecureLS({ encodingType: 'aes' });
  try {
    return ls.get(`${Keys.default.REACT_APP_ACCESS_TOKEN}`) || null;
  } catch (error) {
    return null;
  }
};
