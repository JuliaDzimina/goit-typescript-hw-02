import axios from "axios";

const API_KEY = "1Cc4CFd07kL8RCbPCVziL58l2WO78KY3YFsZl80ZYOQ";

export const getImages = async (query, page) => {
  const { data } = await axios.get("https://api.unsplash.com/photos/", {
    params: {
      client_id: API_KEY,
      query,
      page,
      per_page: 12,
    },
  });
  return data;
};
