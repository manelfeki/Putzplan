import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import mockData from './data';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestTasks = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [tasks] = useState(mockData);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        subtitle={`${tasks.length} in total`}
        title="Latest tasks"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {tasks.map((task, i) => (
            <ListItem
              divider={i < tasks.length - 1}
              key={task.id}
            >
              <ListItemAvatar>
                <img
                  alt="task"
                  className={classes.image}
                  src={task.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={task.name}
                secondary={`Updated ${task.updatedAt.fromNow()}`}
              />
              <IconButton
                edge="end"
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestTasks.propTypes = {
  className: PropTypes.string
};

export default LatestTasks;
