import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { EmployeeCard, Grid } from '@/components';
import { SkeletonCard } from '@/components/Skeleton';
import { useUsers } from '@/data';
import { useDebounce } from '@/hooks';

import { Controls } from './components/Controls';

export const EmployeeGrid = () => {
  const [searchValue, setSearchValue] = useState('');
  const [status, setStatus] = useState('');

  const debouncedSearchValue = useDebounce(searchValue, 300);

  const { data: employees, isLoading, error } = useUsers(debouncedSearchValue);

  const renderEmployees = useCallback(() => {
    if (isLoading) {
      return (
        <Wrapper>
          <Grid>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </Grid>
        </Wrapper>
      );
    }

    if (error) {
      return <Wrapper>Ooops, something went wrong.</Wrapper>;
    }

    if (employees.length === 0) {
      return <Wrapper>No employees found</Wrapper>;
    }

    return (
      <Grid>
        {employees.map(e => (
          <EmployeeCard key={e.id} name={e.name} avatar={e.img} status={e.status} />
        ))}
      </Grid>
    );
  }, [employees, isLoading, error]);

  return (
    <>
      <Controls status={status} onStatusChange={setStatus} search={searchValue} onSearchChange={setSearchValue} />

      {renderEmployees()}
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px;
`;
