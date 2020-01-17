import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardActions, CardContent, Divider, Grid, Typography } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PeopleIcon from '@material-ui/icons/EmojiPeople';
import DoneIcon from '@material-ui/icons/DoneOutline';

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
  }
}));

const TaskCard = props => {
  const { className, task, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.imageContainer}>
          <DoneIcon className={classes.doneIcon}/>
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {task.title}
        </Typography>
      </CardContent>
      <Divider/>
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon}/>
            <Typography
              display="inline"
              variant="body2"
            >
              To do before 01/01/2020
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <PeopleIcon className={classes.statsIcon}/>
            <Typography
              display="inline"
              variant="body2"
            >
              Resident Name
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
