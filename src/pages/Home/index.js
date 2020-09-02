import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchData, fetchMore, resetLimit } from "../../redux/action";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import PokemonCard from "../../components/PokemonCard";

const useStyles = makeStyles(theme => ({
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  loadMoreButton: {
    margin: theme.spacing(2, 0)
  }
}));

const Home = ({ pokemons, pending, error, limit, fetchData, fetchMore, resetLimit }) => {
  document.title = "VINDEX"

  const classes = useStyles();

  useEffect(() => {
    fetchData()
    resetLimit()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (pending) return (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  )

  if (error) return console.error(error);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {pokemons.results.slice(0, limit).map((pokemon, index) => {
          return (
            <Grid key={pokemon + index} item xs={12} sm={6} md={3}>
              <PokemonCard name={pokemon.name} pokemonUrl={pokemon.url} />
            </Grid>
          )
        })}
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <Button
            onClick={() => fetchMore()}
            color="primary"
            className={classes.loadMoreButton}
          >
            show more pokemons...
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

const mapStatetoProps = state => {
  const {
    dataFetch: {
      pokemons, pending, error, limit
    }
  } = state;

  return {
    pokemons, pending, error, limit
  }
}

const mapDispatchtoProps = dispatch => ({
  fetchData: () => dispatch(fetchData()),
  fetchMore: () => dispatch(fetchMore()),
  resetLimit: () => dispatch(resetLimit())
});

Home.propTypes = {
  pokemons: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  pending: PropTypes.bool.isRequired,
  limit: PropTypes.number.isRequired,
  fetchData: PropTypes.func.isRequired,
  fetchMore: PropTypes.func.isRequired,
  resetLimit: PropTypes.func.isRequired
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Home)