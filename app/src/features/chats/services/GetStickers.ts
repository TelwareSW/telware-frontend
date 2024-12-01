import { GIPHY_API_KEY as API_KEY, GIPHY_API_URL as API_URL } from "@constants";
async function getStickers(query: string, limit: number = 20) {
  const res = await fetch(
    `${API_URL}/stickers/search?api_key=${API_KEY}&q=${query}&limit=${limit}&offset=0&rating=g&lang=en`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch stickers");
  }

  const data = await res.json();
  console.log(data.data);
  return data.data;
}

async function getTrendingStickers(limit: number = 20) {
  const res = await fetch(
    `${API_URL}/stickers/trending?api_key=${API_KEY}&limit=${limit}&offset=0&rating=g&lang=en`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch stickers");
  }
  const data = await res.json();
  return data.data;
}

export { getStickers, getTrendingStickers };
