import { useMutation } from 'react-query';
import config from '../../constants/config';
import apiClient from '../api';

export const postCreatePrice = async (body) => await apiClient.post(`${config?.host}/list`, body);

const usePostCreatePrice = (options) => {
  return useMutation((body) => postCreatePrice(body), {
    ...options,
    onSuccess: (response, body, context) => {
      options?.onSuccess?.(response, body, context);
    },
    onError: (error, body, context) => {
      options?.onError?.(error, body, context);
    }
  });
};

export default usePostCreatePrice;
