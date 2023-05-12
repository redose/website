import { useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '../../components/providers/toast';
import redoseApi from '../../redose-api';
import Loading from '../../components/loading';

const SessionPage: FC = function SessionPage() {
  const toast = useToast();
  const router = useRouter();
  const sessionId = router.query.id;

  useEffect(() => {
    if (!sessionId) return () => {};

    const ctrl = new AbortController();
    redoseApi.post(`/user/session/${sessionId}`, {
      signal: ctrl.signal,
    })
      .then(() => {
        toast.success('Session created!');
        router.push('/me');
      })
      .catch((ex) => {
        console.error(ex);
        toast.error(ex.message);
      });

    return () => {
      ctrl.abort();
    };
  }, [sessionId]);

  return (
    <Loading fixed />
  );
};

export default SessionPage;
