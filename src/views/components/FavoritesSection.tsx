import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Dog } from "../../models/dogModel";

interface FavoritesSectionProps {
    favorites: Dog[];
    handleGenerateMatch: () => void;
}

function FavoritesSection({favorites, handleGenerateMatch}: FavoritesSectionProps) {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Favorites ({favorites.length})</Typography>
            {favorites.map((d) => (
                <Typography key={d.id}>
                    {d.name} ({d.breed})
                </Typography>
            ))}
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

export default FavoritesSection;
