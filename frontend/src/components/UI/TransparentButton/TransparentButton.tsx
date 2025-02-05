import React from 'react';
import { TransparentButtonContainer } from './index.styled';

interface Props {
    text?: string; 
    typeBtn?: 'standard' | 'active' | 'disabled'; 
}

export const TransparentButton: React.FC<Props> = ({ text = 'Some Text', typeBtn = 'standard' }) => {
  return (
    <TransparentButtonContainer typebtn={typeBtn} disabled={typeBtn === 'disabled'}>
        <span>{text}</span>
    </TransparentButtonContainer>
  );
};