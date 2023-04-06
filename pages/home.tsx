import * as React from 'react';

import { useEffect, useMemo, useState } from 'react';

import ToDoStore from '../stores/todo';

import { observer } from 'mobx-react';
import { autorun } from 'mobx';

import { Button } from 'semantic-ui-react';

export default observer((props) => {
  const [todoStore] = useState(() => ToDoStore());

  useEffect(() => {
    autorun(() => {
      todoStore.loadToDo();
    });
  }, []);

  return (
    <div>
      <div>To Do</div>
      <div>
        {todoStore.todos.length}
        <Button primary>Primary</Button>
      </div>
      <div></div>
      <div style={{ height: 300, width: '100%' }}></div>
    </div>
  );
});
