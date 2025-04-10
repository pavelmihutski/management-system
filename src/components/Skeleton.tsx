import styled, { keyframes } from 'styled-components';

export const SkeletonCard = () => {
  return (
    <Card>
      <Avatar />
      <Info>
        <Name />
        <StatusRow>
          <FakeDot />
          <Status />
          <FakeTriangle />
        </StatusRow>
      </Info>
    </Card>
  );
};

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const Skeleton = styled.div`
  animation: ${shimmer} 1.5s infinite linear;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  border-radius: 4px;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0px 4px 24px rgba(0, 123, 255, 0.1);
  padding: 20px;
  display: flex;
  align-items: end;
`;

const Avatar = styled(Skeleton)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-right: 24px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled(Skeleton)`
  height: 20px;
  width: 120px;
  margin-bottom: 10px;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 18px;
`;

const FakeDot = styled(Skeleton)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

const Status = styled(Skeleton)`
  width: 80px;
  height: 14px;
  border-radius: 4px;
`;

const FakeTriangle = styled(Skeleton)`
  width: 10px;
  height: 10px;
  clip-path: polygon(50% 100%, 0 0, 100% 0);
  background-color: #dddddd;
`;
