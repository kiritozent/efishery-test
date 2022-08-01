import { uniqBy } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import config from '../../constants/config';
import apiClient from '../api';

const URL_TYPE = {
  city: 'area',
  province: 'area',
  size: 'size'
};

const getOptionList = async (type) => {
  const response = await apiClient.get(`${config.host}/option_${URL_TYPE[type]}`);
  switch (type) {
    case 'city':
    case 'size':
      return response?.data;
    case 'province': {
      return uniqBy(response?.data ?? [], 'province').map((item) => ({ province: item.province }));
    }
    default:
      throw response;
  }
};

const useGetOptionList = (type) => {
  return useQuery(['siteList', type], () => getOptionList(type), {
    keepPreviousData: true
  });
};

export default useGetOptionList;
