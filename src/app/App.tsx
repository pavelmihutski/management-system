import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

import { EmployeePage } from './pages/EmployeePage';
import { AllProviders } from './providers';

export const GlobalStyle = createGlobalStyle`
  ${normalize}
`;

function App() {
  return (
    <AllProviders>
      <EmployeePage />
    </AllProviders>
  );
}

export default App;
