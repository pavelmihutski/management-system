import { memo, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { z } from 'zod';

import { EmployeeStatus } from '@/data';

import { StatusSelect } from '../controls/StatusSelect';
import { ErrorText } from './components/ErrorText';
import { Fields } from './components/Fields';
import { FormButtons } from './components/FormButtons';
import { TextInput } from './components/TextInput';

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

  const resetForm = useCallback(() => {
    setName('');
    setStatus('Working');
    setError(null);
  }, []);

  useEffect(() => {
    if (isOpen) {
      resetForm();

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen, resetForm]);

  const handleCreate = useCallback(() => {
    const result = schema.safeParse({ name });

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    onCreate({ name: result.data.name, status });

    onClose();
  }, [name, status, onCreate, onClose]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleCreate();
    },
    [handleCreate],
  );

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Modal>
        <form onSubmit={handleSubmit}>
          <Title>Create New User</Title>
          <Divider />

          <Fields label="User name:">
            <TextInput ref={inputRef} value={name} onChange={e => setName(e.target.value)} />
            {error && <ErrorText>{error}</ErrorText>}
          </Fields>

          <Fields label="Status:">
            <StatusSelect status={status} onChange={setStatus} />
          </Fields>

          <FormButtons onCancel={onClose} />
        </form>
      </Modal>
    </Overlay>,
    document.body,
  );
};

export default memo(CreateEmployeeModal);

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

const Divider = styled.div`
  height: 1px;
  background-color: #d4d4d4;
  margin: 24px -24px;
`;
