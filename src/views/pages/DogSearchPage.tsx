import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Pagination
} from "@mui/material";
import { fetchAllBreeds, searchDogIds, fetchDogsByIds, generateMatch } from "../../controllers/dogController";
import { Dog } from "../../models/dogModel";
import FilterBar from "../components/FilterBar";
import DogGrid from "../components/DogGrid";
import FavoritesSection from "../components/FavoritesSection";
import MatchedDogDisplay from "../components/MatchedDogDisplay";


function DogSearchPage() {
    const [breedOptions, setBreedOptions] = useState<string[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string>("");
    const [sortField, setSortField] = useState<"breed" | "name" | "age">("breed");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const pageSize = 6;
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);
    const from = (page - 1) * pageSize;
    const totalPages = Math.ceil(totalResults / pageSize);
    const [nextQuery, setNextQuery] = useState<string | null>(null);
    const [prevQuery, setPrevQuery] = useState<string | null>(null);
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [favorites, setFavorites] = useState<Dog[]>([]);
    const [matchedDog, setMatchedDog] = useState<Dog | null>(null);




    // 1) Fetch all breed names on mount
    useEffect(() => {
        fetchAllBreeds()
            .then(setBreedOptions)
            .catch(err => console.error("Failed to get breed list:", err));
    }, []);

    // 2) Rerun search on changes to breed, sort, or page
    useEffect(() => {
        doSearch();
    }, [selectedBreed, sortField, sortDirection, page]);


    async function doSearch() {
        try {
            // Step A: Get dog IDs from /dogs/search
            const queryParams: Record<string, any> = {
                size: pageSize,
                from: from,
                sort: `${sortField}:${sortDirection}`
            };
            if (selectedBreed) {
                queryParams.breeds = [selectedBreed];
            }

            const searchRes = await searchDogIds(queryParams);
            setTotalResults(searchRes.total);
            setNextQuery(searchRes.next || null);
            setPrevQuery(searchRes.prev || null);

            // Step B: fetch the actual Dog objects
            if (searchRes.resultIds.length > 0) {
                const dogObjects = await fetchDogsByIds(searchRes.resultIds);
                setDogs(dogObjects);
            } else {
                setDogs([]);
            }
        } catch (err) {
            console.error("Search Error:", err);
        }
    }


    function toggleFavorite(dog: Dog) {
        const isFav = favorites.some((favorite: Dog) => favorite.id === dog.id);
        if (isFav) {
            setFavorites(favorites.filter((favorite: Dog) => favorite.id !== dog.id));
        } else {
            setFavorites([...favorites, dog]);
        }
    }

    async function handleGenerateMatch() {
        if (favorites.length === 0) return;
        try {
            const dogIds = favorites.map((favorite: Dog) => favorite.id);
            const matchedId = await generateMatch(dogIds);

            const [dog] = await fetchDogsByIds([matchedId]);
            setMatchedDog(dog);
        } catch (err) {
            console.error("Match Error:", err);
            alert("Error generating match");
        }
    }


    return (
        <Box sx={styles.dogSearchPageBox}>
            <Typography variant="h4" gutterBottom>Dog Search</Typography>

            {/* Filter / Sort UI */}
            <FilterBar
                selectedBreed={selectedBreed}
                setSelectedBreed={setSelectedBreed}
                breedOptions={breedOptions}
                sortField={sortField}
                setSortField={setSortField}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                setPage={setPage}
            />

            {/* Dog Grid */}
            <DogGrid
                dogs={dogs}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
            />

            {/* Pagination */}
            <Box sx={styles.paginationBox}>
                <Typography>
                    Showing {dogs.length} of {totalResults} results
                </Typography>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(event, newPage) => setPage(newPage)}
                    color="primary"
                    shape="rounded"
                    sx={{ mt: 1 }}
                />
            </Box>


            {/* Favorites & Match */}
            <FavoritesSection
                favorites={favorites}
                handleGenerateMatch={handleGenerateMatch}
            />

            {/* Matched Dog Display */}
            {matchedDog && (
                <MatchedDogDisplay
                    matchedDog={matchedDog}
                />
            )}

        </Box>
    );
}

const styles = {
    dogSearchPageBox: { p: 2 },
    filterBox:{ display: "flex", gap: 2, mb: 2 },
    paginationBox:{ mb: 2 },
    dogCard:{ height: "100%", display: "flex", flexDirection: "column" },
}

export default DogSearchPage;
