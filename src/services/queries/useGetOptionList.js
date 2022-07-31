import { uniqBy } from 'lodash';
import { stringify } from 'query-string';
import { useQuery } from 'react-query';
import config from '../../constants/config';
import apiClient from '../api';

const URL_TYPE = {
  city: 'area',
  province: 'area',
  size: 'size'
};

const getOptionList = async (type, params) => {
  const urlParams = {
    search: JSON.stringify(params)
  };
  const response = await apiClient.get(
    `${config.host}/option_${URL_TYPE[type]}?${stringify(urlParams)}`
  );
  switch (type) {
    case 'city':
    case 'size':
      return response?.data?.data;
    case 'province': {
      return uniqBy(response?.data?.data ?? [], 'province').map((item) => ({ type: item.type }));
    }
    default:
      throw response;
  }
};

const useGetOptionList = (type) => {
  return useQuery(['siteList', type], () => getOptionList(type), {
    keepPreviousData: true,
    onSuccess: (response) => {
      console.log({ response });
    },
    onError: (error) => {
      console.error({ error });
    }
  });
};

export default useGetOptionList;