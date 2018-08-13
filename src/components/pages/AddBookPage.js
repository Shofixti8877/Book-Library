import React from 'react';
import { Card } from 'semantic-ui-react';

import AddBook from '../modals/AddBook'

const AddBookPage = () => (
  <Card centered>
    <Card.Content textAlign="center">
      <Card.Header>Add new book</Card.Header>
      <AddBook></AddBook>
    </Card.Content>
  </Card>
);

export default AddBookPage;
