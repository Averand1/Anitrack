// Function to fetch anime data from the API
async function getAnimeData(pageLimit, offset) {
  const response = await axios.get(`https://kitsu.io/api/edge/anime?page[limit]=${pageLimit}&page[offset]=${offset}`);
  return response.data.data
}
// Main function to fetch and insert anime data into the database
(async () => { 
    let pageLimit = 20;
    let offset = 8684;
    let animeList = [];
    let hasMoreAnime = true;
  
    // Looping through the API pages until all data has been fetched and inserted into the database
    while (hasMoreAnime) {
      animeList = await getAnimeData(pageLimit, offset);
      if (animeList.length === 0) {
        hasMoreAnime = false;
      } else {
        await insertAnimeIntoDatabase(animeList);
        offset += pageLimit;
      }
    }
  })();

export {getAnimeData}