import { Switch, SwitchProps, useColorMode } from '@chakra-ui/react';

const ColorModeSwitch = (props: SwitchProps) => {
  const { setColorMode } = useColorMode();
  return <Switch onChange={(event) => setColorMode(event.target.checked ? 'light' : 'dark')} {...props} />;
};

export default ColorModeSwitch;
