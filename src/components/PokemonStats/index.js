import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";

import { formatText } from "../../utils";

const statWidth = stat => {
  return (stat / 20) * 10;
}

const statBackground = stat => {
  const statValue = statWidth(stat);
  if (statValue > 70) {
    return green[300];
  } else if (statValue > 35) {
    return orange[300];
  } else {
    return red[300];
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1)
  },
  textLight: {
    fontWeight: '100'
  },
  alignRight: {
    textAlign: 'right'
  },
  statBar: {
    position: 'relative',
    height: 17,
    width: '100%',
    border: '.5px solid #ccc',
    borderRadius: '25px',
    background: 'transparent',
    zIndex: 1,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      height: '100%',
      width: stat => statWidth(stat) + "%",
      background: stat => statBackground(stat),
      borderRadius: '25px',
      zIndex: 0
    }
  }
}));

const PokemonStats = ({ name, stat }) => {
  const classes = useStyles(stat);

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="button" component="span" className={classes.textLight}>
          {formatText(name)}
        </Typography>
      </div>
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={11}>
          <div className={classes.statBar}></div>
        </Grid>

        <Grid item xs={1} className={classes.alignRight}>
          <Typography variant="button" component="span" className={classes.textLight}>
            {stat}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

PokemonStats.propTypes = {
  name: PropTypes.string.isRequired,
  stat: PropTypes.number.isRequired
}

export default PokemonStats;