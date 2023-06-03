import type { FC } from 'react';
import styles from './timestamp.module.scss';

interface Props {
  className?: string;
  date: Date;
  label?: string;
}

const Timestamp: FC<Props> = function Timestamp({
  className,
  date,
  label = 'Created at',
}) {
  return (
    <p className={className}>
      <span className={styles.label}>{label}</span>
      &nbsp;
      {date.toLocaleString()}
    </p>
  );
};

export default Timestamp;
