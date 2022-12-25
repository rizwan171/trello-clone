import { ReactNode } from 'react';

export type CollapseProps = {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
};