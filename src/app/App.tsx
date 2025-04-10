import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

import { EmployeePage } from './pages/EmployeePage';
import { AllProviders } from './providers';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {
  return (
    <AllProviders>
      <GlobalStyle />
      <EmployeePage />
    </AllProviders>
  );
}

export default App;
