import {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
  FC,
} from 'react';
import { Toast } from 'react-bootstrap';
import styled from 'styled-components';

interface ToastMessage {
  title?: string;
  message: string;
  type?: string;
  close(): void;
}

type ToastOptions = Omit<ToastMessage, 'message' | 'close'>;
type ToastDispatcher = (message: string, options: ToastOptions) => void;

const ToastContext = createContext<ToastDispatcher | null>(null);

type ToastApiDispatcher = (message: string, options?: Omit<ToastOptions, 'type'>) => void;
interface ToastApi {
  success: ToastApiDispatcher ;
  info: ToastApiDispatcher;
  error: ToastApiDispatcher;
}

export function useToast(): ToastApi {
  const dispatch = useContext(ToastContext);
  if (!dispatch) throw new Error('Missing parent <ToastProvider />');
  return {
    success: (message, options) => dispatch(message, { ...options, type: 'success' }),
    info: (message, options) => dispatch(message, { ...options, type: 'info' }),
    error: (message, options) => dispatch(message, { ...options, type: 'error' }),
  };
}

const ToastList = styled.ul`
  display: block;
  list-style: none;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  &:empty {
    display: none;
  }

  > li:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

interface Props {
  children: ReactNode;
}

const ToastProvider: FC<Props> = function ToastProvider({ children }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  function close(message: string) {
    setToasts((prev) => prev.filter((toast) => toast.message !== message));
  }

  const dispatch = useCallback<ToastDispatcher>((message, options) => {
    setToasts((prev) => {
      if (prev.some((toast) => toast.message === message)) return prev;
      const closeTimeout = setTimeout(() => close(message), 8000);
      return prev.concat({
        ...options,
        message,
        close() {
          clearTimeout(closeTimeout);
          close(message);
        },
      });
    });
  }, []);

  return (
    <ToastContext.Provider value={dispatch}>
      {children}

      <ToastList>
        {toasts.map((toast) => (
          <Toast
            key={toast.message}
            as="li"
            bg={toast.type}
            onClose={toast.close}
            show
            animation
          >
            <Toast.Header closeButton>{toast.title}</Toast.Header>
            <Toast.Body>{toast.message}</Toast.Body>
          </Toast>
        ))}
      </ToastList>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
