import React from "react";
import {Box, Typography, Button, Chip} from "@mui/material";
import { Dog } from "../../models/dogModel";

interface FavoritesSectionProps {
    favorites: Dog[];
    handleGenerateMatch: () => void;
    toggleFavorite: (dog: Dog) => void;
}

function FavoritesSection({favorites, handleGenerateMatch, toggleFavorite}: FavoritesSectionProps) {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Favorites ({favorites.length})</Typography>
            <Box sx={styles.favoritesWrap}>
                {favorites.map((dog) => (
                    <Chip key={Math.random()} sx={styles.favoriteItem} label={`${dog.name } ${dog.breed}`} variant="outlined" onDelete={() => toggleFavorite(dog)} />
                ))}
            </Box>
            <Button
                variant="contained"
                sx={{ mt: 2 }}
                disabled={!favorites.length}
                onClick={handleGenerateMatch}
            >
                Generate Match
            </Button>
        </Box>
    );
}

const styles = {
    favoritesWrap: {display: 'flex', flexWrap:'wrap'},
    favoriteItem:{m:1}
}

export default FavoritesSection;
