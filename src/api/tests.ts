import axios from "axios";
import { TestData } from "../types/TestDataType";

export const fetchTestsApi = async () => {
  const result = await axios.get<TestData[]>(
    "https://mocki.io/v1/a6211b61-bcdc-4dd5-9385-39e5ece01e7b",
  );

  return result.data;
};
