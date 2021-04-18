import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Link, Button } from "@material-ui/core";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";


const Pokemon=(props) => {
    const { history, match }=props;
    const { params }=match;
    const { pokemonId }=params;
    const [pokemon, setPokemon]=useState(undefined)

    // const toFirstCharUppercase=(name) => name.charAt(0).toUpperCase()+name.slice(1);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then(function (response) {
                const { data }=response;
                setPokemon(data);
            })
            .catch(function (error) {
                setPokemon(false);
            });
    }, [pokemonId]);



    const generatePokemonJSX=() => {
        const { name, id, species, height, weight, types, sprites }=pokemon;
        const fullImageUrl=`https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default }=sprites;

        return (
            <>
                <Typography variant="h1">
                    {`${id}. ${toFirstCharUppercase(name)}`}
                    <img src={front_default} />
                </Typography>
                <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
                <Typography variant="h3">Pokemon Info</Typography>
                <Typography>
                    {"Species: "}
                    <Link href={species.url}>{species.name}</Link>
                </Typography>
                <Typography>Height: {height}</Typography>
                <Typography>Weight:</Typography>
                <Typography variant="h6">Types:</Typography>
                {types.map((typeInfo) => {
                    const { type }=typeInfo;
                    const { name }=type;
                    return (
                        <Typography key={name}> {`${name}`}</Typography>
                    )
                })}
            </>
        );
    };


    return (
        <>
            {pokemon===undefined&&<CircularProgress />}
            {pokemon!==undefined&&pokemon&&generatePokemonJSX()}
            {pokemon===undefined&&<Typography>Pokemon not found</Typography>}
            {pokemon!==undefined&&(
                <Button variant="contained" onClick={() => history.push("/")}>Back to Pokedex</Button>
            )}
        </>
    )
};

export default Pokemon;



