import * as React from 'react';
import { ProgressBar, Colors } from 'react-native-paper';

const Progress = () => (
  <ProgressBar progress={0.65} color={Colors.red800} />
);

export default Progress;