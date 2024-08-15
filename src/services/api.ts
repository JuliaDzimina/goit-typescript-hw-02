import axios from "axios";

const API_KEY = "1Cc4CFd07kL8RCbPCVziL58l2WO78KY3YFsZl80ZYOQ";

export const getImages = async <T>(query: string, page: number): Promise<T> => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=${query}&per_page=12&page=${page}`
  );

  return response.data;
};
