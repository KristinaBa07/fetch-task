import React from "react";
import { Dog } from "../../models/dogModel";
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Button,
    Typography
} from "@mui/material";

interface DogGridProps {
    dogs: Dog[];
    favorites: Dog[];
    toggleFavorite: (dog: Dog) => void;
}

function DogGrid({dogs, favorites, toggleFavorite}: DogGridProps) {
    return (
        <Grid container spacing={2}>
            {dogs.map((dog) => {
                const isFavorite = favorites.some(f => f.id === dog.id);
                return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={dog.id}>
                        <Card sx={styles.cardWrapper}>
                            {dog.img && (
                                <CardMedia component="img" height="200" image={dog.img} alt={dog.name} />
                            )}
                            <CardContent>
                                <Typography variant="h6">{dog.name}</Typography>
                                <Typography>Breed: {dog.breed}</Typography>
                                <Typography>Age: {dog.age}</Typography>
                                <Typography>Zip: {dog.zip_code}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant={isFavorite ? "contained" : "outlined"}
                                    color={isFavorite ? "error" : "primary"}
                                    onClick={() => toggleFavorite(dog)}
                                >
                                    {isFavorite ? "Remove Favorite" : "Add Favorite"}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
}
const styles = {
    cardWrapper: { height: "100%", display: "flex", flexDirection: "column" }
}

export default DogGrid;
