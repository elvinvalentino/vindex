import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    fontFamily: 'roboto'
  }
});

const App = () => {
  const classes = useStyles();

  return (
    <Typography variant="overline" component="h1">
      RP 15.000
    </Typography>
  )
}

export default App;