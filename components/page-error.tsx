import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  error?: Error;
}

const PageError: FC<Props> = function PageError({ children, error }) {
  return (
    <div>
      {children}
      {error && (
        <pre>{error.toString()}</pre>
      )}
    </div>
  );
};

export default PageError;
