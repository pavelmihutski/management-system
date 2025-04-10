import { useEffect } from 'react';
import { useRef } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

import { StatusSelect } from '@/components/controls/StatusSelect';
import { EmployeeStatus } from '@/data';

type ControlsProps = {
  status: EmployeeStatus;
  onStatusChange: (value: EmployeeStatus) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
  isOpen: boolean;
};

export const Controls = ({ status, onStatusChange, search, onSearchChange, onCreate, isOpen }: ControlsProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [isOpen]);

  return (
    <ControlsWrapper>
      <CreateButton onClick={onCreate}>
        Create <FaPlus />
      </CreateButton>

      <SearchWrapper>
        <FaSearch />
        <SearchInput
          ref={inputRef}
          type="text"
          placeholder="Type to search"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
      </SearchWrapper>

      <Divider />
      <StatusSelectWrapper>
        <StatusSelect status={status || 'Working'} onChange={onStatusChange} />
      </StatusSelectWrapper>
    </ControlsWrapper>
  );
};

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  gap: 16px;
`;

const CreateButton = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 14px 30px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #005bb5;
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 6px 10px;
  min-width: 280px;
  flex: 1;

  svg {
    font-size: 14px;
    color: #bbbbbb;
    margin-right: 8px;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
  color: #333;

  &::placeholder {
    color: #bbb;
  }
`;

const Divider = styled.div`
  height: 32px;
  width: 1px;
  background-color: #e0e0e0;
`;

const StatusSelectWrapper = styled.div`
  width: 100%;
  max-width: 200px;
`;
