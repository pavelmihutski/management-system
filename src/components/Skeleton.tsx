import styled, { keyframes } from 'styled-components';

export const SkeletonCard = () => {
  return (
    <Card>
      <Avatar />
      <Name />
      <Status />
    </Card>
  );
};

const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

const Skeleton = styled.div`
  background: #f0f0f0;
  border-radius: 8px;
  width: 100%;
  height: 20px;
  animation: ${shimmer} 1.5s infinite linear;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled(Skeleton)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Name = styled(Skeleton)`
  height: 20px;
  width: 60%;
`;

const Status = styled(Skeleton)`
  height: 14px;
  width: 40%;
  margin-top: 10px;
`;
