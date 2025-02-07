import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Pagination, Modal, Button
} from "@mui/material";
import { fetchAllBreeds, searchDogIds, fetchDogsByIds, generateMatch } from "../../controllers/dogController";
import { Dog } from "../../models/dogModel";
import FilterBar from "../components/FilterBar";
import DogGrid from "../components/DogGrid";
import FavoritesSection from "../components/FavoritesSection";
import MatchedDogDisplay from "../components/MatchedDogDisplay";
import SearchIcon from "@mui/icons-material/Search";
import {logoutUser} from "../../controllers/authController";
import {useNavigate} from "react-router-dom";


function DogSearchPage() {
    const navigate = useNavigate();
    const [breedOptions, setBreedOptions] = useState<string[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string>("");
    const [sortField, setSortField] = useState<"breed" | "name" | "age">("breed");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const pageSize = 8;
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);
    const from = (page - 1) * pageSize;
    const totalPages = Math.ceil(totalResults / pageSize);
    const [nextQuery, setNextQuery] = useState<string | null>(null);
    const [prevQuery, setPrevQuery] = useState<string | null>(null);
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [favorites, setFavorites] = useState<Dog[]>([]);
    const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
    const [matchedDogWindowIsOpen, setMatchedDogWindowIsOpen] = useState<boolean>(false)



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
            setMatchedDogWindowIsOpen(true)
        } catch (err) {
            console.error("Match Error:", err);
            alert("Error generating match");
        }
    }

    async function logoutHandler (){
        await logoutUser();
        localStorage.removeItem("authorized");
        navigate("/login");
    }


    return (
        <Box sx={styles.dogSearchPageBox}>
            <Button sx={{position:'absolute', top:'20px', right:'20px'}} onClick={logoutHandler}>Log Out</Button>

            <Typography variant="h2" gutterBottom sx={styles.title}>
                <SearchIcon fontSize="large" />
                Dog Search
            </Typography>

            {/* Filter / Sort UI */}
            <Box sx={styles.filterBarWrap}>
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

            </Box>

            {/* Dog Grid */}
            <Box sx={styles.dogGridBox}>
                <DogGrid
                    dogs={dogs}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                />
            </Box>

            {/* Pagination */}
            <Box sx={styles.paginationWrapper}>
                <Box sx={styles.paginationBox}>
                    <Typography>
                        Found {totalResults} dogs
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
            </Box>



            {/* Favorites & Match */}
            <Box sx={styles.favoritesBox}>
                <FavoritesSection
                    favorites={favorites}
                    handleGenerateMatch={handleGenerateMatch}
                    toggleFavorite={toggleFavorite}
                />
            </Box>

            {/* Matched Dog Display */}
            <Modal
                open={matchedDogWindowIsOpen}
                onClose={() => setMatchedDogWindowIsOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={styles.matchedWrap}
            >
                <Box sx={styles.matchedBox}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        The best match for you
                    </Typography>
                    {matchedDog && <MatchedDogDisplay
                        matchedDog={matchedDog}
                    />}
                </Box>
            </Modal>
        </Box>
    );
}

const styles = {
    title: { display: "flex", alignItems: "center", gap: "8px", mb: 7 },
    dogSearchPageBox: { display: "flex", flexDirection: "column", alignItems: "center", p: 2 },
    filterBox: { display: "flex", gap: 2, mb: 2 },
    filterBarWrap: { mb: 7 },
    paginationBox: { mb: 2, display: "flex", alignItems: "flex-end", justifyContent: "space-between" },
    dogCard: { height: "100%", display: "flex", flexDirection: "column" },
    dogGridBox: {},
    paginationWrapper: { display: "flex", justifyContent: "flex-end" },
    favoritesBox: { width: "100%", maxWidth: "100%", display: "flex", justifyContent: "flex-start" },
    matchedWrap: { display: "flex", justifyContent: "center", alignItems: "center" },
    matchedBox: {
        width: "500px",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "5px"
    }
};


export default DogSearchPage;
