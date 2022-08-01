import { uniqBy } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import config from '../../constants/config';
import apiClient from '../api';

const getAreaList = async () => {
  const response = await apiClient.get(`${config.host}/option_area`);
  const province = uniqBy(response?.data ?? [], 'province').map((item) => ({
    province: item.province
  }));
  const city = response?.data;
  return { province, city };
};

const useGetAreaList = () => {
  return useQuery(['areaList'], () => getAreaList(), {
    keepPreviousData: true
  });
};

export default useGetAreaList;
