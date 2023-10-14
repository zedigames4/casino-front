import Secure from '@/utils/helpers/secureLs';

export function getHeaders() {
  return {
    headers: { Authorization: `Bearer ${Secure.getToken()}` },
  };
}
const Config = {
  getHeaders,
};
export default Config;
