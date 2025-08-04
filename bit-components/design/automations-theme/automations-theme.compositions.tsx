import { TokenViewer } from '@bitdesign/sparks.sparks-theme';
import { useTheme } from './automations-theme-provider.js';
import { AutomationsTheme } from './automations-theme.js';

function ViewTokens() {
  const theme = useTheme();

  return <TokenViewer theme={theme} />;
}

export const LightTheme = () => {
  return (
    <AutomationsTheme>
      <ViewTokens />
    </AutomationsTheme>
  );
};

export const DarkTheme = () => {
  return (
    <AutomationsTheme initialTheme='dark'>
      <ViewTokens />
    </AutomationsTheme>
  );
};