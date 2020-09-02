import React from "react";
import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const PokemonNotFound = ({ query }) => {
  document.title = "VINDEX | POKEMON NOT FOUND"

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" component="h1">
        Pokemon not found with the name or number of "{query}"
      </Typography>
    </Container>
  )
}

PokemonNotFound.propTypes = {
  query: PropTypes.string.isRequired
}

export default PokemonNotFound;