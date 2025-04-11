import styled from 'styled-components';

type FieldsProps = {
  label: string;
  children: React.ReactNode;
};

export const Fields = ({ label, children }: FieldsProps) => (
  <Wrapper>
    <Label>{label}</Label>
    {children}
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #888;
  margin-bottom: 4px;
`;
