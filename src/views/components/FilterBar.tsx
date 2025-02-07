import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface FilterBarProps {
    selectedBreed: string;
    setSelectedBreed: (val: string) => void;
    breedOptions: string[];
    sortField: "breed" | "name" | "age";
    setSortField: (val: "breed" | "name" | "age") => void;
    sortDirection: "asc" | "desc";
    setSortDirection: (val: "asc" | "desc") => void;
    setPage: (val: number) => void;
}

function FilterBar({
    selectedBreed,
    setSelectedBreed,
    breedOptions,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    setPage }: FilterBarProps) {

    return (
        <Box sx={styles.filterBox}>
            {/* Breed Filter */}
            <FormControl sx={styles.formControlWrap}>
                <InputLabel>Breed</InputLabel>
                <Select
                    label="Breed"
                    value={selectedBreed}
                    onChange={(e) => {
                        setSelectedBreed(e.target.value);
                        setPage(1);
                    }}
                >
                    <MenuItem value="">
                        <em>All Breeds</em>
                    </MenuItem>

                    {breedOptions.map((breed) => (
                        <MenuItem key={breed} value={breed}>
                            {breed}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Sort Field */}
            <FormControl sx={styles.formControlWrap}>
                <InputLabel>Sort Field</InputLabel>
                <Select
                    label="Sort Field"
                    value={sortField}
                    onChange={(e) => {
                        setSortField(e.target.value as "breed" | "name" | "age");
                        setPage(1);
                    }}
                >
                    <MenuItem value="breed">Breed</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="age">Age</MenuItem>
                </Select>
            </FormControl>

            {/* Sort Direction */}
            <FormControl sx={styles.formControlWrap}>
                <InputLabel>Direction</InputLabel>
                <Select
                    label="Direction"
                    value={sortDirection}
                    onChange={(e) => {
                        setSortDirection(e.target.value as "asc" | "desc");
                        setPage(1);
                    }}
                >
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

const styles = {
    filterBox:{ display: "flex", gap: 2, mb: 2 },
    formControlWrap:{ minWidth: 150 }
}

export default FilterBar;
