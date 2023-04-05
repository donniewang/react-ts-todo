import * as React from 'react';

import ToDoStore from '../stores/todo';

import Button from '@mui/material/Button';

import { observer } from 'mobx-react';

export default observer(() => {
  const [todoStore] = React.useState(() => ToDoStore());

  return (
    <div>
      <div>Home{todoStore.todos.length}</div>
      <div>
        <Button variant="contained">Add</Button>
      </div>
    </div>
  );
});
