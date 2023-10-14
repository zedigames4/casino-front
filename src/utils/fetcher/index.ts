import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import Http from '../http';

export const fetcher = async (path: string) => {
  return Http.axios
    .get(path)
    .then(res => res.data)
    .catch(error => {
      throw error.response?.data || error;
    });
};

export const useFetcher = (pathname: string) => {
  const { data, error, mutate } = useSWR(pathname, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useInfiniteFetcher = (
  pathname: string,
  getKey: (pageIndex: any, previousPageData: string | any[]) => string | null,
) => {
  const { data, size, setSize, error, mutate } = useSWRInfinite(
    getKey,
    fetcher,
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
