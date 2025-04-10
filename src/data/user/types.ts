export const employeeStatuses = ['Working', 'OnVacation', 'LunchTime', 'BusinessTrip'];

export type EmployeeStatus = (typeof employeeStatuses)[number];

export type User = {
  id: number;
  status: EmployeeStatus;
  name: string;
  img: string;
};
