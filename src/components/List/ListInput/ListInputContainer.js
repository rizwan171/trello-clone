import { Collapse, Paper, Typography } from '@mui/material';
import useStyles from './styles';
import React, { useState } from 'react';
import ListInputCard from './ListInputCard/ListInputCard';

const ListInputContainer = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  
  return (
    <div className={classes.inputContainer}>
      <Collapse in={open}>
        <ListInputCard setOpen={setOpen}/>
      </Collapse>
      <Collapse in={!open}>
        <Paper className={classes.addCard} onClick={() => setOpen(!open)} elevation={0}>
          <Typography>
            Add a Card
          </Typography>
        </Paper>
      </Collapse>
    </div>
  );
}

export default ListInputContainer;