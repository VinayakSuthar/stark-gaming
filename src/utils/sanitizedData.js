function sanitizeGames(data) {
  return data?.data?.data?.map((game) => {
    const { Name, genres, background_image } = game.attributes;
    const sanitizedGenres = genres?.data?.map((genre) => {
      const { name, slug } = genre.attributes;
      return { id: genre.id, name, slug };
    });
    return {
      id: game.id,
      name: Name,
      genres: sanitizedGenres,
      background_image: `${import.meta.env.VITE_IMAGE_URL}${
        background_image?.data?.attributes?.url
      }`,
    };
  });
}

export { sanitizeGames };
