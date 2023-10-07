import axios from "axios";
import { ResultsResponse } from "../types/ResultsResponseType";

export const fetchResultsApi = async () => {
  const result = await axios.get<ResultsResponse>(
    "https://mocki.io/v1/265d2d2c-b594-462b-9c2e-9cab2f40f4dc",
  );
  return result.data;
};
