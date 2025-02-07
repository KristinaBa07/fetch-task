import React from "react";
import { Box, Typography } from "@mui/material";
import { Dog } from "../../models/dogModel";

interface MatchedDogDisplayProps {
    matchedDog: Dog;
}

function MatchedDogDisplay({ matchedDog }: MatchedDogDisplayProps) {
    return (
        <Box sx={styles.matchDisplayBox}>
            <Typography variant="subtitle1">Your Match:</Typography>
            <Typography>Name: {matchedDog.name}</Typography>
            <Typography>Breed: {matchedDog.breed}</Typography>
            <Typography>Age: {matchedDog.age}</Typography>
            <Typography>Zip: {matchedDog.zip_code}</Typography>
            {matchedDog.img && (
                <Box sx={{ mt: 1 }}>
                    <img src={matchedDog.img} alt={matchedDog.name} width={200} />
                </Box>
            )}
        </Box>
    );
}

const styles = {
    matchDisplayBox: { mt: 2, p: 2, display: "inline-block", backgroundColor:"white" }
}

export default MatchedDogDisplay;
