import axios from "axios";

export async function getAnsSafeCache() {
  try {
    const ansCache = (await axios.get("https://ans-stats.decent.land/users"))
      ?.data;

    const res = ansCache?.res
      ? ansCache.res.slice(ansCache.res.length - 50).reverse() // return the latest 50 minted labels
      : [];

    return res;
  } catch (error) {
    console.log(error);
  }
}
