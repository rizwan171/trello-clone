import { Clear } from '@mui/icons-material';
import { Button, IconButton, InputBase, Paper } from '@mui/material';
import useStyle from './styles.js';
import React from 'react';

const ListInputCard = ({ setOpen }) => {
  const classes = useStyle();

  const btnConfirm = {
    background: "#5aac44",
    color: "#fff",
    "&:hover": {
      background: "#5aac44",
      filter: "brightness(80%)"
    }
  }

  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase onBlur={() => setOpen(false)} multiline fullWidth inputProps={{ className: classes.input }} placeholder='Start Typing...'/>
        </Paper>
      </div>
      <div className={classes.confirm}>
        <Button sx={btnConfirm} className='btnConfirm,' variant="contained" onClick={() => setOpen(false)}>Add Card</Button>
        <IconButton onClick={() => setOpen(false)}><Clear /></IconButton>
      </div>
    </div>
  );
}

export default ListInputCard;