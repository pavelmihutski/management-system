import { useState } from 'react';
import styled from 'styled-components';

import { EmployeeStatus, employeeStatuses } from '@/data';

const statusColors: Record<EmployeeStatus, string> = {
  Working: 'green',
  OnVacation: 'blue',
  LunchTime: 'orange',
  BusinessTrip: 'purple',
};

type StatusSelectProps = {
  status: EmployeeStatus;
  onChange: (newStatus: EmployeeStatus) => void;
  isUpdating?: boolean;
};

export const StatusSelect = ({ status, onChange, isUpdating = false }: StatusSelectProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = async (newStatus: EmployeeStatus) => {
    await onChange(newStatus);

    setOpen(false);
  };

  return (
    <StyledDropdown>
      {isUpdating ? (
        <StatusPlaceholder />
      ) : (
        <>
          <DropdownButton onClick={() => setOpen(!open)}>
            <StatusDot color={statusColors[status]} />
            <span>{status}</span>
            <Triangle />
          </DropdownButton>

          {open && (
            <StatusList>
              {employeeStatuses.map(s => (
                <StatusItem key={s} onClick={() => handleSelect(s)}>
                  <StatusDot color={statusColors[s]} />
                  {s}
                </StatusItem>
              ))}
            </StatusList>
          )}
        </>
      )}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: relative;
  margin-top: 6px;
  width: 100%;
`;

const DropdownButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  padding: 4px 8px;
  border: none;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  color: #2c3e50;
  background: transparent;
  width: 100%;
  box-sizing: border-box;
`;

const Triangle = styled.span`
  margin-left: auto;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #888;
`;

const StatusList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 4px;
  margin-top: 5px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 100%;
  box-sizing: border-box;
`;

const StatusItem = styled.div`
  padding: 6px 12px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const StatusDot = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const StatusPlaceholder = styled.div`
  height: 25px;
  width: 100%;
  min-width: 140px;
  border-bottom: 1px solid transparent;
  border-radius: 4px;
  background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
  background-size: 200% 100%;
  animation: loading 1.2s infinite;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
