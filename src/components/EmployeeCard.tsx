import { memo } from 'react';
import styled from 'styled-components';

type EmployeeCardProps = {
  name: string;
  avatar: string;
  status: string;
};

export const EmployeeCard = memo(({ name, avatar, status }: EmployeeCardProps) => {
  return (
    <Card>
      <Avatar src={avatar} alt={name} />
      <Name>{name}</Name>
      <Status>{status}</Status>
    </Card>
  );
});

export const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

export const Name = styled.h3`
  margin: 0;
  font-size: 18px;
`;

export const Status = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: gray;
`;
