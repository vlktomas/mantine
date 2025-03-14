import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { DEFAULT_THEME } from '@mantine/styles';
import { Button } from '../../Button/Button';
import { Group } from '../../Group/Group';
import { Progress } from '../Progress';

function SetDemo() {
  const [value, setValue] = useState(50);
  const setValueToRandom = () => setValue(Math.round(Math.random() * 99));

  return (
    <div style={{ maxWidth: 500, padding: 50 }}>
      <Progress value={value} />
      <Group style={{ marginTop: 20 }} position="center">
        <Button onClick={setValueToRandom}>Set random value</Button>
      </Group>
    </div>
  );
}

const sizes = ([2, 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
  <Progress size={size} value={50} key={size} style={{ marginTop: 20 }} />
));

const getThemes = (props?: any) =>
  Object.keys(DEFAULT_THEME.colors).map((color) => (
    <Progress key={color} color={color} value={50} style={{ marginTop: 20 }} {...props} />
  ));

storiesOf('@mantine/core/Progress/stories', module)
  .add('Sizes', () => <div style={{ maxWidth: 500, padding: 50 }}>{sizes}</div>)
  .add('Colors', () => <div style={{ maxWidth: 500, padding: 50 }}>{getThemes()}</div>)
  .add('Striped', () => (
    <div style={{ maxWidth: 500, padding: 50 }}>{getThemes({ striped: true })}</div>
  ))
  .add('Value changes', () => <SetDemo />);
