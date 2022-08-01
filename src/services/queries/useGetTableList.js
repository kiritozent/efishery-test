import { stringify } from 'query-string';
import { useQuery } from 'react-query';
import config from '../../constants/config';
import apiClient from '../api';

const getTableList = async (url, params) => {
  const response = await apiClient.get(`${config.host}/${url}?${stringify(params)}`);

  return response?.data;
};

const useGetTableList = (url, { filter }) => {
  const params = {
    search: JSON.stringify(filter)
  };
  return useQuery([url, params], () => getTableList(url, params), {
    keepPreviousData: true
  });
};

export default useGetTableList;
