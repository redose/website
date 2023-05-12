import { useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import redoseApi from '../redose-api';
import { useToast } from './providers/toast';

const RedoseApiInterceptors: FC = function RedoseApiInterceptors() {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const resId = redoseApi.interceptors.response.use((res) => res, (ex) => {
      if (axios.isCancel(ex)) {
        if (!axios.isAxiosError(ex)) toast.error('Unknown error fetching data from server.');
        else if (ex.status! === 400) toast.error('Invalid request.');
        else if (ex.status! === 401) {
          toast.error('You must be logged in to perform this action.');
          router.push('/login');
        } else if (ex.status! === 403) {
          toast.error('You do not have permissions to view this resource.');
        } else if (ex.status! === 404) toast.error('Resource does not exist.');
        else toast.error('Unknown server error.');
      }
      return Promise.reject(ex);
    });

    return () => {
      redoseApi.interceptors.response.eject(resId);
    };
  });

  return null;
};

export default RedoseApiInterceptors;
