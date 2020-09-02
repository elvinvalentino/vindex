import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchDataDetail } from "../../redux/action";
import clsx from "clsx";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";

import PokemonNotFound from "../pokemonNotFound";
import PokemonType from "../../components/PokemonType";
import PokemonStats from "../../components/PokemonStats";

import { formatText } from "../../utils";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  card: {
    maxWidth: 700,
    margin: '0 auto'
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundSize: 'contain'
  },
  type: {
    margin: theme.spacing(.5, 0),
    paddingRight: theme.spacing(1)
  },
  ability: {
    textTransform: 'capitalize'
  },
  textBold: {
    fontWeight: 500
  },
  textLight: {
    fontWeight: 100
  }
}));

const PokemonDetail = ({ pokemon, pending, error, fetchDataDetail }) => {

  const { query } = useParams();
  const classes = useStyles();

  const uppercasedPokemonName = text => text.replace("-", " ").toUpperCase();
  const heightWeightConvert = (num, type) => {
    num /= 10;

    switch (type) {
      case "height":
        return `${num} M`;
      case "weight":
        return `${num} KG`;
      default:
        console.error("invalid type");
    }
  }

  useEffect(() => {
    fetchDataDetail(query);
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  if (pending) {
    return (
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    )
  }

  if (error) {
    return <PokemonNotFound query={query} />
  }

  document.title = `VINDEX | ${uppercasedPokemonName(pokemon.name)}`;

  return (
    <Container maxWidth="md" className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          image={pokemon.sprites.other['official-artwork'].front_default}
          title={pokemon.name}
          className={classes.media}
        />
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            className={classes.textBold}
          >
            {uppercasedPokemonName(pokemon.name)}
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={6}>
              <Typography variant="subtitle1" component="p" className={classes.textBold}>
                Height
              </Typography>
              <Typography variant="button" component="p" className={classes.textLight}>
                {heightWeightConvert(pokemon.height, "height")}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6}>
              <Typography variant="subtitle1" component="p" className={classes.textBold}>
                Weight
              </Typography>
              <Typography variant="button" component="p" className={classes.textLight}>
                {heightWeightConvert(pokemon.weight, "weight")}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p" className={classes.textBold}>
                Types
              </Typography>
              <div className={classes.type}>
                {pokemon.types.map((type, index) => {
                  return (
                    <PokemonType key={index} label={type.type.name} width="auto" mRight />
                  )
                })}
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p" className={classes.textBold}>
                Ability
              </Typography>
              <Typography
                variant="button"
                component="p"
                className={clsx(classes.textLight, classes.ability)}
              >
                {pokemon.abilities.map((ability, index) => {
                  let lastIndex = pokemon.abilities.length - 1;
                  if (pokemon.abilities.length === 1) return `${formatText(ability.ability.name)}`;
                  if (index === lastIndex) {
                    return `${formatText(ability.ability.name)}.`
                  } else {
                    return `${formatText(ability.ability.name)}, `
                  }
                })}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle1" component="p" className={classes.textBold}>
                Stats
              </Typography>
              <div>
                {pokemon.stats.map((stat, index) => {
                  return <PokemonStats key={index} name={stat.stat.name} stat={stat.base_stat} />
                })}
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}

const mapStatetoProps = state => {
  const { dataFetchDetail: { pokemon, pending, error } } = state;
  return { pokemon, pending, error };
}

const mapDispatchtoProps = dispatch => ({
  fetchDataDetail: (query) => dispatch(fetchDataDetail(query))
});

PokemonDetail.propTypes = {
  pokemon: PropTypes.object.isRequired,
  pending: PropTypes.bool.isRequired,
  fetchDataDetail: PropTypes.func.isRequired
}

export default connect(mapStatetoProps, mapDispatchtoProps)(PokemonDetail);