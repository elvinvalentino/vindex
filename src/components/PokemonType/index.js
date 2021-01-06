import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Chip from "@material-ui/core/Chip";
import green from "@material-ui/core/colors/green";
import purple from "@material-ui/core/colors/purple";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import brown from "@material-ui/core/colors/brown";
import orange from "@material-ui/core/colors/orange";
import grey from "@material-ui/core/colors/grey";
import yellow from "@material-ui/core/colors/yellow";
import pink from "@material-ui/core/colors/pink"

const useStyles = makeStyles(theme => ({
  root: {
    color: '#fff',
    fontWeight: 'Bold',
    height: 35,
    borderRadius: '50px'
  },
  width100: {
    width: '100%'
  },
  widthAuto: {
    width: 'auto'
  },
  mRight: {
    marginRight: theme.spacing(0.5)
  },
  grassType: {
    background: green[300]
  },
  poisonType: {
    background: purple[500]
  },
  fireType: {
    background: red[500]
  },
  flyingType: {
    background: blue[300]
  },
  waterType: {
    background: blue[500]
  },
  bugType: {
    background: green[500]
  },
  fightingType: {
    background: orange[500]
  },
  groundType: {
    background: brown[300]
  },
  rockType: {
    background: brown[500]
  },
  ghostType: {
    background: blue[100]
  },
  steelType: {
    background: grey[500]
  },
  electricType: {
    background: yellow[500]
  },
  psychicType: {
    background: purple[300]
  },
  iceType: {
    background: blue[200]
  },
  dragonType: {
    background: red[300]
  },
  darkType: {
    background: grey[900]
  },
  fairyType: {
    background: pink[500]
  },
  unknownType: {
    background: grey[700]
  },
  shadowType: {
    background: grey[500]
  }
}));

const PokemonType = ({ label, width, mRight }) => {
  const classes = useStyles();

  label = label.toUpperCase();

  const chipClasses = clsx(
    classes.root,
    {
      [classes.grassType]: label === "GRASS",
      [classes.poisonType]: label === "POISON",
      [classes.fireType]: label === "FIRE",
      [classes.flyingType]: label === "FLYING",
      [classes.waterType]: label === "WATER",
      [classes.bugType]: label === "BUG",
      [classes.fightingType]: label === "FIGHTING",
      [classes.groundType]: label === "GROUND",
      [classes.rockType]: label === "ROCK",
      [classes.ghostType]: label === "GHOST",
      [classes.steelType]: label === "STEEL",
      [classes.electricType]: label === "ELECTRIC",
      [classes.psychicType]: label === "PSYCHIC",
      [classes.iceType]: label === "ICE",
      [classes.dragonType]: label === "DRAGON",
      [classes.darkType]: label === "DARK",
      [classes.fairyType]: label === "FAIRY",
      [classes.unknownType]: label === "UNKNOWN",
      [classes.shadowType]: label === "SHADOW",
      [classes.width100]: width === "100%",
      [classes.widthAuto]: width === "auto",
      [classes.mRight]: mRight
    }
  )

  return (
    <Chip
      label={label}
      className={chipClasses} />
  )
}

PokemonType.defaultProps = {
  width: "100%"
}

PokemonType.propTypes = {
  label: PropTypes.string.isRequired,
  width: PropTypes.oneOf(['100%', 'auto']),
  mRight: PropTypes.bool
}

export default PokemonType;