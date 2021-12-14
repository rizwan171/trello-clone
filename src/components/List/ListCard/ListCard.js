import { Paper } from '@mui/material';
import useStyle from './styles.js';
import React from 'react';

const ListCard = () => {
  const classes = useStyle();

  return (
    <div>
      <Paper className={classes.card}>Card Content</Paper>
    </div>
  )
}

export default ListCard;