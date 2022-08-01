import { useQuery } from '@tanstack/react-query';
import config from '../../constants/config';
import apiClient from '../api';

const getTableList = async (url) => {
  const response = await apiClient.get(`${config.host}/${url}`);

  return response?.data;
};

const useGetTableList = (url) => {
  return useQuery([url], () => getTableList(url), {
    keepPreviousData: true
  });
};

export default useGetTableList;
