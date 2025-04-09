import styled from 'styled-components';

type ControlsProps = {
  status: string;
  onStatusChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

export const Controls = ({ status, onStatusChange, search, onSearchChange }: ControlsProps) => {
  return (
    <ControlsWrapper>
      <Input type="text" placeholder="Search..." value={search} onChange={e => onSearchChange(e.target.value)} />
      <Select value={status} onChange={e => onStatusChange(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="Working">Working</option>
        <option value="On Vacation">On Vacation</option>
        <option value="Lunch Time">Lunch Time</option>
        <option value="Business Trip">Business Trip</option>
      </Select>
      <Button>+ Create</Button>
    </ControlsWrapper>
  );
};

const ControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Input = styled.input`
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  flex: 1;
  min-width: 200px;
`;

const Select = styled.select`
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  min-width: 160px;
`;

const Button = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;
