import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PeopleIcon from '@material-ui/icons/EmojiPeople';
import DoneIcon from '@material-ui/icons/DoneOutline';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTask, getTaskData, markTaskDone } from '../../../../common/actions';
import store from '../../../../store';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `0px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  doneIcon: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  },
  waitingIcon: {
    color: theme.palette.warning.light,
    marginRight: theme.spacing(1)
  }
}));

const TaskCard = props => {
  const { className, task, ...rest } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        avatar={
          <IconButton>
            <DeleteOutlineIcon onClick={() => {
              dispatch(deleteTask(task.id));
              window.location.reload();
            }}/>
          </IconButton>
        }
        action={
          <IconButton>
            {!task.isDone ? <DoneOutlineIcon onClick={() => {
              dispatch(markTaskDone(task.id));
              window.location.reload();
            }}/> : <Typography variant="body2" color="textSecondary" component="p">
              Done
            </Typography>}
          </IconButton>
        }
      />
      <CardContent>
        <div className={classes.imageContainer}>
          {task.isDone ? <DoneIcon className={classes.doneIcon} /> : <HourglassEmptyIcon className={classes.waitingIcon} />}
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"

        >
          <Link onClick={(e) => {
            e.preventDefault();
            dispatch(getTaskData(task.id));
            if (store.getState().rootReducer.residents) {
              window.location.href = `/tasks/update/${task.id}`;
            }
          }}>{task.title}</Link>
        </Typography>
        {task.occurence>0 ?  <Typography variant="body2" color="textSecondary" component="p">
          Repeats every {task.occurence} week
        </Typography> : <Typography> &nbsp;&nbsp;&nbsp;</Typography>}
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {task.before}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              display="block"
              variant="body3"
            >
            </Typography>


            <PeopleIcon className={classes.statsIcon}/>
            <Typography
              display="inline"
              variant="body2"
            >
              {task.name.name}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

TaskCard.propTypes = {
  className: PropTypes.string,
  task: PropTypes.object.isRequired
};

export default TaskCard;
