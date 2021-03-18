import * as React from 'react';
import { ProgressBar, Colors } from 'react-native-paper';

const Progress = () => (
  <ProgressBar progress={0.65} color={Colors.green800} style={{height:25}} />
);

export default Progress;