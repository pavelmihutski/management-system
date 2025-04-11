import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { EmployeeCard, Grid, SkeletonCard } from '@/components';
import { Employee, EmployeeStatus, useCreateEmployee, useEmployees, useUpdateEmployee } from '@/data';
import { useDebounce } from '@/hooks';

import { Controls } from './components/Controls';

const CreateEmployeeModal = lazy(() =>
  import('@/components/modal').then(module => ({ default: module.CreateEmployeeModal })),
);

export const EmployeeGrid = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [status, setStatus] = useState<EmployeeStatus>('Working');
  const [open, setOpen] = useState(false);

  const debouncedSearchValue = useDebounce(searchValue, 300);
  const { data, isLoading, error } = useEmployees(debouncedSearchValue);

  const { create } = useCreateEmployee();
  const { update } = useUpdateEmployee();

  const handleSubmit = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleStatusChange = useCallback(
    async (employee: Employee) => {
      await update(employee);
    },
    [update],
  );

  const handleCreate = useCallback(
    async (employee: { name: string; status: string }) => {
      try {
        await create(employee);
      } catch (error) {
        console.error('Create error:', error);
      }
    },
    [create],
  );

  const filteredEmployees = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter(employee => employee.status === status);
  }, [data, status]);

  const content = useMemo(() => {
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

    if (filteredEmployees.length === 0) {
      return <Wrapper>No employees found</Wrapper>;
    }

    return (
      <Grid>
        {filteredEmployees.map(employee => {
          const onStatusChange = (status: EmployeeStatus) => handleStatusChange({ ...employee, status });

          return (
            <EmployeeCard
              key={employee.id}
              name={employee.name}
              avatar={employee.img}
              status={employee.status}
              onStatusChange={onStatusChange}
            />
          );
        })}
      </Grid>
    );
  }, [isLoading, error, filteredEmployees, handleStatusChange]);

  return (
    <>
      <Controls
        status={status}
        onStatusChange={setStatus}
        search={searchValue}
        onSearchChange={setSearchValue}
        isOpen={open}
        onCreate={handleSubmit}
      />

      {content}

      <Suspense fallback={null}>
        {open && <CreateEmployeeModal isOpen={open} onClose={handleClose} onCreate={handleCreate} />}
      </Suspense>
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;
