import React, { useState, useEffect } from "react"
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography";

import PokemonType from "../PokemonType";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  link: {
    textDecoration: 'none'
  },
  media: {
    height: 140,
    backgroundSize: 'contain',
    marginTop: theme.spacing(2)
  },
  name: {
    textTransform: 'capitalize'
  },
  action: {
    marginBottom: theme.spacing(1)
  }
}))

const PokemonCard = ({ name, pokemonUrl }) => {
  const classes = useStyles();

  const [isLoading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    let isMounted = true
    axios.get(pokemonUrl)
      .then(({ data }) => {
        if (isMounted) {
          setPokemonData(data)
          setLoading(false);
        }
      })
      .catch(err => {
        isMounted && console.error(err);
      })

    return () => isMounted = false;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) return null

  const { sprites, types } = pokemonData;

  return (
    <Link to={`/pokemon/${name}`} className={classes.link}>
      <Card>
        <CardActionArea>
          <CardMedia
            image={sprites.other['official-artwork'].front_default}
            title={name}
            className={classes.media}
          />
          <CardContent>
            <Typography variant="h5" component="p" className={classes.name}>
              {name}
            </Typography>
          </CardContent>
          <CardActions className={classes.action}>
            <Grid container spacing={1}>
              {
                types.map((type, index) => {
                  return (
                    <Grid key={index} item xs={6}>
                      <PokemonType label={type.type.name} />
                    </Grid>
                  )
                })
              }
            </Grid>
          </CardActions>
        </CardActionArea>
      </Card>
    </Link>
  )
}

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  pokemonUrl: PropTypes.string.isRequired
}

export default PokemonCard;