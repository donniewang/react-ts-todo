import * as React from 'react';

import * as todoStore from './stores/todo';

import Button from '@mui/material/Button';

import { observer } from 'mobx-react';

export default observer(() => {
  const [todo] = React.useState(() => todoStore());

  return <div>Home</div>;
});
