import { forwardRef } from 'react';
import styled from 'styled-components';

type TextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ value, onChange }, ref) => {
  return <Input ref={ref} value={value} onChange={onChange} />;
});

const Input = styled.input`
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
`;
