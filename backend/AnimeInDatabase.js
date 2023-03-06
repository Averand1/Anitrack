// Function to insert anime data into the database
async function insertAnimeIntoDatabase(animeList) {
    const connection = await connectToDatabase();
  
    if(!connection) {
      console.log('No Connection', connection)
    }
  
    try {
      
      // Iterating over the list of anime data and inserting each record into the database
      for (const animeKey in animeList) {
        const anime = animeList[animeKey];
        const query = `
          INSERT INTO anime (id, title, cover_image)
          VALUES (?, ?, ?)
        `;
        const params = [
          anime.id,
          anime.attributes.canonicalTitle ?? '',
          anime.attributes.posterImage.medium ?? '',
        ];
        await connection.execute(query, params);
      }
  
  
    } catch (error) {
      console.error(error);
    } finally {
      connection.end();
  }}

export {insertAnimeIntoDatabase}