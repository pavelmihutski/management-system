import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { EmployeeCard, Grid } from '@/components';
import { SkeletonCard } from '@/components';
import { CreateUserModal } from '@/components/Modal';
import { EmployeeStatus, useCreateUser, User, useUpdateUser, useUsers } from '@/data';
import { useDebounce } from '@/hooks';

import { Controls } from './components/Controls';

export const EmployeeGrid = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [status, setStatus] = useState<EmployeeStatus>('Working');
  const [open, setOpen] = useState(false);

  const debouncedSearchValue = useDebounce(searchValue, 300);
  const { data, isLoading, error } = useUsers(debouncedSearchValue);

  const { create } = useCreateUser();
  const { update } = useUpdateUser();

  const handleStatusChange = useCallback(
    async (user: User) => {
      await update(user);
    },
    [update],
  );

  const handleCreate = useCallback(
    async (user: { name: string; status: string }) => {
      try {
        await create(user);
      } catch (error) {
        console.log('error', error);
      }
    },
    [create],
  );

  const renderEmployees = useCallback(() => {
    if (isLoading) {
      return (
        <Wrapper>
          <Grid>
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </Grid>
        </Wrapper>
      );
    }

    if (error) {
      return <Wrapper>Ooops, something went wrong.</Wrapper>;
    }

    const employees = status ? data.filter(e => e.status === status) : data;

    if (employees.length === 0) {
      return <Wrapper>No employees found</Wrapper>;
    }

    return (
      <Grid>
        {employees.map(employee => (
          <EmployeeCard
            key={employee.id}
            name={employee.name}
            avatar={employee.img}
            status={employee.status}
            onStatusChange={status => handleStatusChange({ ...employee, status })}
          />
        ))}
      </Grid>
    );
  }, [data, isLoading, error, status, handleStatusChange]);

  return (
    <>
      <Controls
        status={status}
        onStatusChange={setStatus}
        search={searchValue}
        onSearchChange={setSearchValue}
        isOpen={open}
        onCreate={() => setOpen(true)}
      />
      <CreateUserModal isOpen={open} onClose={() => setOpen(false)} onCreate={handleCreate} />

      {renderEmployees()}
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;
