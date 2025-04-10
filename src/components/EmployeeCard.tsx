import { memo, useState } from 'react';
import styled from 'styled-components';

import { EmployeeStatus } from '@/data';

import { StatusSelect } from './controls/StatusSelect';

type EmployeeCardProps = {
  name: string;
  avatar: string;
  status: EmployeeStatus;
  onStatusChange: (newStatus: EmployeeStatus) => Promise<void>;
};

export const EmployeeCard = memo(({ name, avatar, status, onStatusChange }: EmployeeCardProps) => {
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  const handleChange = async (newStatus: EmployeeStatus) => {
    setIsStatusUpdating(true);

    await onStatusChange(newStatus);

    setIsStatusUpdating(false);
  };

  return (
    <Card>
      <Avatar src={avatar} alt={name} />
      <Info>
        <Name>{name}</Name>
        <StatusSelect status={status} onChange={handleChange} isUpdating={isStatusUpdating} />
      </Info>
    </Card>
  );
});

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  align-items: end;
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 4px 20px rgba(0, 123, 255, 0.3);
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #2c3e50;
`;
