import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  CardMedia,
  Typography,
  TextField,
  CardActionArea,
  createTheme,
  Box,
} from '@mui/material';
// import Toolbar from '@mui/material/Toolbar';
// import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

import Mockdata from '../Mockdata/Mockdata';
import { useNavigate } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@mui/styles';
import Container from '@mui/material/Container';
import { FaTwitter, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

import './Pokedex.css';
// import lato from 'https://fonts.googleapis.com/css2?family=Lato:ital@1&display=swap'

// Material UI Styles
const useStyles = makeStyles((theme) => ({
  cardMedia: {
    margin: 'auto',
  },
  cardContent: {
    textAlign: 'center',
  },
  pokedexGrid: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingRight: '50px',
  },
  searchContainer: {
    display: 'flex',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  searchIcon: {
    alignSelf: 'flex-end',
    marginBottom: '5px',
  },
  searchInput: {
    width: '200px',
    margin: '5px',
  },
  card: {
    backgroundColor: 'lightBlue',
    borderRadius: '20px',
  },
}));

//   Function for Capitalizing first Character of String
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Main Function
function Pokedex() {
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState('');

  var navigate = useNavigate();
  const classes = useStyles();

  // Calling API
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=898`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  // Get value from Seach bar by passing the event value
  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  // Pokemon Card Component
  const getPokemonCard = (pokemonId) => {
    const { id, name, img } = pokemonData[pokemonId];

    return (
      <Grid item xs={2.3} key={pokemonId}>
        <Card
          onClick={() => navigate(`/${pokemonId}`)}
          elevation={3}
          style={{
            maxWidth: 345,
            // boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.3)',
            // backgroundColor: 'rgba(255, 255, 255, 0.6)',
            backgroundColor: 'rgba(68, 129, 172, 0.6)',
            borderRadius: '20px',
            boxShadow: '0px 3px 15px rgpa(100, 100, 100, 0.5)',
          }}
        >
          <CardActionArea>
            <CardMedia
              classes={{ root: classes.cardMedia }}
              image={img}
              style={{
                width: '155px',
                height: '155px',
                marginTop: '10px',
                backgroundColor: 'rgba(225, 225, 225, 0)',
              }}
              className={classes.cardMedia}
            />
            <CardContent className={classes.cardContent}>
              <Typography className={classes.pokemonIdNumber}>
                <span>#{id.toString().padStart(3, '0')}</span>
                <br />{' '}
              </Typography>
              <Typography
                style={{
                  fontSize: '20px',
                  letterSpacing: '1px',
                }}
              >
                {capitalizeFirstLetter(name)}
                <br />
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  // Returning main Pokedex Page
  return (
    <>
      <AppBar
        position="sticky"
        style={{ background: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar>
          <div>
            <Typography className={classes.pokedexHeading} variant="h4">
              PokéDéx
            </Typography>
          </div>

          <div className="search-container">
            <input
              className="search-bar"
              placeholder="Search for Pokemon"
              onChange={handleSearchChange}
              label="Pokémon"
              variant="standard"
            />
            <a>
              <img
                class="search-icon"
                src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
                alt="img"
              />
            </a>
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Container>
          <Grid container spacing={4} className={classes.pokedexGrid}>
            {Object.keys(pokemonData).map(
              (pokemonId) =>
                pokemonData[pokemonId].name.includes(filter) &&
                getPokemonCard(pokemonId)
            )}
          </Grid>
        </Container>
      ) : (
        <CircularProgress />
      )}
      <div style={{ background: 'rgba(51, 170, 51, 0)' }}>
        <div className="footer">
          <div className="footer-content">
            <ul className="footer-socials">
              <li>
                <a href="mailto: sanskaryerawar@gmail.com">
                  <FaEnvelope />
                </a>
              </li>
              <li>
                <a href="https://github.com/Sanskar6000">
                  <FaGithub />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/sanskar-yerawar-056307205/">
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/Sanskar6000">
                  <FaTwitter />
                </a>
              </li>
            </ul>
            <h3>Made by Sanskar Yerawar</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pokedex;

// Pokémon
