import { memo } from 'react';
import styled from 'styled-components';

type FormButtonsProps = {
  onCancel: () => void;
};

export const FormButtons = memo(({ onCancel }: FormButtonsProps) => (
  <Buttons>
    <CreateButton type="submit">Create</CreateButton>
    <CancelButton type="button" onClick={onCancel}>
      Cancel
    </CancelButton>
  </Buttons>
));

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
