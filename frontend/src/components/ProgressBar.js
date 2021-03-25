import * as React from 'react';
import { ProgressBar, Colors } from 'react-native-paper';

var completion = 0.65

const Progress = () => (
  <ProgressBar progress={completion} color={Colors.green800} style={{height:25, width: 350, alignSelf: 'center', marginVertical: 20}} />
);

export default Progress;