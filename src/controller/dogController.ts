import { apiClient } from "../services/apiClient";
import { Dog } from "../models/dogModel";

/**
 * Get all breed names
 */
export async function fetchAllBreeds(): Promise<string[]> {
  const res = await apiClient.get<string[]>("/dogs/breeds");
  return res.data;
}

interface DogSearchResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

interface MatchResponse {
  match: string;
}

/**
 * Search dogs via GET /dogs/search.
 */
export async function searchDogIds(params: {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}): Promise<DogSearchResponse> {
  const res = await apiClient.get<DogSearchResponse>("/dogs/search", {
    params,
  });
  return res.data;
}

/**
 * Fetch actual dog objects by ID
 */
export async function fetchDogsByIds(ids: string[]): Promise<Dog[]> {
  const res = await apiClient.post<Dog[]>("/dogs", ids);
  return res.data;
}

/**
 * Generate a match by sending array of favorited dog IDs
 */
export async function generateMatch(dogIds: string[]): Promise<string> {
  const res = await apiClient.post<MatchResponse>("/dogs/match", dogIds);
  return res.data.match; // This is the dog ID that was matched
}
