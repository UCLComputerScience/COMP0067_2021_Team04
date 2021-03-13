import * as React from 'react';
import { DataTable } from 'react-native-paper';

const Table = () => (
  <DataTable>
    <DataTable.Header>
      <DataTable.Title>Progress</DataTable.Title>
      <DataTable.Title numeric>Level</DataTable.Title>
      <DataTable.Title numeric>Score</DataTable.Title>
    </DataTable.Header>

    <DataTable.Row>
      <DataTable.Cell>Beginner</DataTable.Cell>
      <DataTable.Cell numeric>5</DataTable.Cell>
      <DataTable.Cell numeric>35</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Intermediate</DataTable.Cell>
      <DataTable.Cell numeric>2</DataTable.Cell>
      <DataTable.Cell numeric>60</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Row>
      <DataTable.Cell>Advanced</DataTable.Cell>
      <DataTable.Cell numeric>7</DataTable.Cell>
      <DataTable.Cell numeric>125</DataTable.Cell>
    </DataTable.Row>

    <DataTable.Pagination
      page={1}
      numberOfPages={3}
      onPageChange={page => {
        console.log(page);
      }}
      label="1-2 of 6"
    />
  </DataTable>
);

export default Table;