import { MoreHoriz } from '@mui/icons-material';
import { InputBase, Typography } from '@mui/material';
import React, { useState } from 'react';
import useStyle from './styles.js';

const ListTitle = () => {
  const [selected, setSelected] = useState(false);
  const classes = useStyle();

  return (
    <div>
      {
        selected ? (
          <div>
            <InputBase value="todo" fullWidth autoFocus inputProps={{ className: classes.input }} />
          </div>
        ) : (
          <div className={classes.editableTitleContainer}>
            <Typography 
              onClick={() => setSelected(!selected)}  
              className={classes.editableTitle}
              onBlur={() => setSelected(!selected)}
            >
              Title
            </Typography>
            <MoreHoriz />
          </div>
        )
      }
    </div>
  )
}

export default ListTitle;
