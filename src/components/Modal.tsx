import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { z } from 'zod';

import { EmployeeStatus } from '@/data';

import { StatusSelect } from './controls/StatusSelect';

type CreateEmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (employee: { name: string; status: string }) => void;
};

const schema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .regex(/^[a-zA-Z]+$/, 'Only English alphabetical characters are allowed'),
});

export const CreateEmployeeModal = ({ isOpen, onClose, onCreate }: CreateEmployeeModalProps) => {
  const [name, setName] = useState('');

  const [status, setStatus] = useState<EmployeeStatus>('Working');
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName('');

      setStatus('Working');
      setError(null);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleCreate = () => {
    const result = schema.safeParse({ name });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    onCreate({ name: result.data.name, status });
    onClose();
  };

  return ReactDOM.createPortal(
    <Overlay>
      <Modal>
        <Title>Create New User</Title>

        <Divider />

        <FieldGroup>
          <Label>User name:</Label>
          <Input ref={inputRef} value={name} onChange={e => setName(e.target.value)} />
          {error && <ErrorText>{error}</ErrorText>}
        </FieldGroup>

        <FieldGroup>
          <Label>Status:</Label>
          <StatusSelect status={status} onChange={setStatus} />
        </FieldGroup>

        <Buttons>
          <CreateButton onClick={handleCreate}>Create</CreateButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </Buttons>
      </Modal>
    </Overlay>,
    document.body,
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 20px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #888;
  margin-bottom: 4px;
  display: block;
`;

const Input = styled.input`
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  margin-top: 24px;
`;

const CreateButton = styled.button`
  background-color: #2f80ed;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #1c6dd0;
  }
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #444;
  font-weight: bold;
  cursor: pointer;
  padding: 10px 20px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 13px;
  margin-top: 4px;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #d4d4d4;
  margin: 24px -24px;
`;
