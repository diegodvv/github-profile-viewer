import { Switch, SwitchProps, useColorMode } from '@chakra-ui/react';

const ColorModeSwitch = (props: SwitchProps) => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Switch
      isChecked={colorMode === 'light'}
      onChange={(event) => setColorMode(event.target.checked ? 'light' : 'dark')}
      {...props}
    />
  );
};

export default ColorModeSwitch;
