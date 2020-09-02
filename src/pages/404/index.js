import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  font: {
    fontWeight: 100,
    fontSize: 20,
    letterSpacing: 1
  }
})

const PageNotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="button" component="h1" className={classes.font}>
        404 | Not Found
      </Typography>
    </div>
  )
}

export default PageNotFound;