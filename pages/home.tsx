import * as React from 'react';

import { useEffect, useMemo, useState } from 'react';

import ToDoStore from '../stores/todo';

import { observer } from 'mobx-react';
import { autorun } from 'mobx';

import { v4 as uuidv4 } from 'uuid';

import { Button, Grid, Header, Input, Modal } from 'semantic-ui-react';

export default observer((props) => {
  const [todoStore] = useState(() => ToDoStore());

  const [current, setCurrent] = useState();

  const [isAddDialogShow, setIsAddDialogShow] = useState(false);
  const [isModifyDialogShow, setIsModifyDialogShow] = useState(false);
  const [isDeleteDialogShow, setIsDeleteDialogShow] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    todoStore.loadToDo();
  }, []);

  const showAddDialog = () => {
    setIsAddDialogShow(true);
  };

  const doAdd = () => {
    console.log('doAdd');
    todoStore.addToDo({
      id: uuidv4(),
      title: title,
      content: content,
      finishTime: time,
      status: 1,
    });
    closeAddDialog();
  };

  const closeAddDialog = () => {
    setIsAddDialogShow(false);
  };

  const showModifyDialog = (item) => {
    console.log('showModifyDialog', item);
    setCurrent(item);
    setTitle(item.title);
    setContent(item.content);
    setTime(item.finishTime);
    setIsModifyDialogShow(true);
  };

  const doModify = () => {
    console.log('doModify');
    todoStore.modifyToDo({
      id: current.id,
      title: title,
      content: content,
      finishTime: time,
      status: current.status,
    });
    closeModifyDialog();
  };

  const closeModifyDialog = () => {
    setIsModifyDialogShow(false);
  };

  const showDeleteDialog = (item) => {
    console.log('showDeleteDialog', item);
    setCurrent(item);
    setIsDeleteDialogShow(true);
  };

  const doDelete = () => {
    console.log('doDelete');
    todoStore.removeToDo(current);
    closeDeleteDialog();
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogShow(false);
  };

  const doComplete = (item) => {
    console.log('doComplete', item);
    todoStore.completeToDo(item);
  };

  return (
    <div>
      <Grid inverted padded>
        <Grid.Row textAlign="center">
          <Grid.Column>
            <Header as="h2">To Do</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row textAlign="center" verticalAlign="middle" columns={2}>
          <Grid.Column textAlign="left">
            count : {todoStore.todos.length} | complete : {todoStore.complete} |
            uncomplete : {todoStore.uncomplete}
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Button primary onClick={showAddDialog}>
              <Header as="h3" inverted>
                +
              </Header>
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={5} color="grey">
          <Grid.Column width={2}>title</Grid.Column>
          <Grid.Column width={3}>content</Grid.Column>
          <Grid.Column width={2}>finish time</Grid.Column>
          <Grid.Column width={3}>status</Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
        {todoStore.todos.map((row, index) => (
          <Grid.Row key={index} columns={5} verticalAlign="middle">
            <Grid.Column width={2}>{row.title}</Grid.Column>
            <Grid.Column width={3}>{row.content}</Grid.Column>
            <Grid.Column width={2}>{row.finishTime}</Grid.Column>
            <Grid.Column width={3}>
              {row.status == 1 ? 'not complete' : 'completed'}
            </Grid.Column>
            <Grid.Column width={4}>
              <Button.Group size="small">
                <Button onClick={() => showModifyDialog(row)}>Modify</Button>
                <Button onClick={() => showDeleteDialog(row)}>Delete</Button>
                <Button onClick={() => doComplete(row)}>Complete</Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        ))}
      </Grid>

      <Modal dimmer="blurring" open={isAddDialogShow}>
        <Modal.Header>Add To Do</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Grid inverted padded>
              <Grid.Row textAlign="left" verticalAlign="middle">
                <Grid.Column width={2}>
                  <Header as="h5">title</Header>
                </Grid.Column>
                <Grid.Column width={10} textAlign="left">
                  <Input
                    placeholder="title"
                    onChange={(e, d) => setTitle(e.target.value)}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row textAlign="left" verticalAlign="middle">
                <Grid.Column width={2}>
                  <Header as="h5">content</Header>
                </Grid.Column>
                <Grid.Column width={10} textAlign="left">
                  <Input
                    placeholder="content"
                    onChange={(e, d) => setContent(e.target.value)}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row textAlign="left" verticalAlign="middle">
                <Grid.Column width={2}>
                  <Header as="h5">time</Header>
                </Grid.Column>
                <Grid.Column width={10} textAlign="left">
                  <Input
                    placeholder="time"
                    onChange={(e, d) => setTime(e.target.value)}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeAddDialog} negative>
            Cancel
          </Button>
          <Button onClick={doAdd} positive>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal dimmer="blurring" open={isModifyDialogShow}>
        <Modal.Header>Modify To Do</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Grid inverted padded>
              <Grid.Row textAlign="left" verticalAlign="middle">
                <Grid.Column width={2}>
                  <Header as="h5">title</Header>
                </Grid.Column>
                <Grid.Column width={10} textAlign="left">
                  <Input
                    placeholder="title"
                    onChange={(e, d) => setTitle(e.target.value)}
                    defaultValue={title}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row textAlign="left" verticalAlign="middle">
                <Grid.Column width={2}>
                  <Header as="h5">content</Header>
                </Grid.Column>
                <Grid.Column width={10} textAlign="left">
                  <Input
                    placeholder="content"
                    onChange={(e, d) => setContent(e.target.value)}
                    defaultValue={content}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row textAlign="left" verticalAlign="middle">
                <Grid.Column width={2}>
                  <Header as="h5">time</Header>
                </Grid.Column>
                <Grid.Column width={10} textAlign="left">
                  <Input
                    placeholder="time"
                    onChange={(e, d) => setTime(e.target.value)}
                    defaultValue={time}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModifyDialog} negative>
            Cancel
          </Button>
          <Button onClick={doModify} positive>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal dimmer="blurring" open={isDeleteDialogShow}>
        <Modal.Header>Delete To Do</Modal.Header>
        <Modal.Content>
          <Modal.Description>Are you sure to delete ?</Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeDeleteDialog} negative>
            Cancel
          </Button>
          <Button onClick={doDelete} positive>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
});
