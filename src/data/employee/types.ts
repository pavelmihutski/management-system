export const employeeStatuses = ['Working', 'OnVacation', 'LunchTime', 'BusinessTrip'];

export type EmployeeStatus = (typeof employeeStatuses)[number];

export type Employee = {
  id: number;
  status: EmployeeStatus;
  name: string;
  img: string;
};
