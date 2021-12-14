import { Paper } from '@mui/material';
import useStyle from './styles.js';
import React from 'react';
import ListTitle from './ListTitle/ListTitle';
import ListCard from './ListCard/ListCard.js';
import ListInputContainer from './ListInput/ListInputContainer.js';

const List = () => {
  const classes = useStyle();
  return (
    <div>
      <Paper className={classes.root}>
        <ListTitle />
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
        <ListInputContainer />
      </Paper>
    </div>
  );
}

export default List;