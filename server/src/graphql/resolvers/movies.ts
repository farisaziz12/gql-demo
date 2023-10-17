import fetch from "node-fetch";

const TMDB_API_KEY = "KEY"; // Replace with your TMDB API key

type Movie = {
  id: number | null;
  adult: boolean | null;
  backdrop_path: string | null;
  belongs_to_collection: string | null;
  budget: number | null;
  genres: Genre[] | null;
  homepage: string | null;
  imdb_id: string | null;
  original_language: string | null;
  original_title: string | null;
  overview: string | null;
  popularity: number | null;
  poster_path: string | null;
  production_companies: ProductionCompany[] | null;
  production_countries: ProductionCountry[] | null;
  release_date: string | null;
  revenue: number | null;
  runtime: number | null;
  spoken_languages: SpokenLanguage[] | null;
  status: string | null;
  tagline: string | null;
  title: string | null;
  video: boolean | null;
  vote_average: number | null;
  vote_count: number | null;
};

type Genre = {
  id: number | null;
  name: string | null;
};

type ProductionCompany = {
  id: number | null;
  logo_path: string | null;
  name: string | null;
  origin_country: string | null;
};

type ProductionCountry = {
  iso_3166_1: string | null;
  name: string | null;
};

type SpokenLanguage = {
  english_name: string | null;
  iso_639_1: string | null;
  name: string | null;
};

const resolveMovie = (movie: Movie) => ({
  id: movie.id || null,
  adult: movie.adult || null,
  backdrop_path: movie.backdrop_path || null,
  belongs_to_collection: movie.belongs_to_collection || null,
  budget: movie.budget || null,
  genres: movie.genres || null,
  homepage: movie.homepage || null,
  imdb_id: movie.imdb_id || null,
  original_language: movie.original_language || null,
  original_title: movie.original_title || null,
  overview: movie.overview || null,
  popularity: movie.popularity || null,
  poster_path: () => {
    console.log("I GOT CALLED");
    if (!movie.poster_path) return null;

    // some expensive calculation to create poster path

    return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  },
  production_companies: movie.production_companies || null,
  production_countries: movie.production_countries || null,
  release_date: movie.release_date || null,
  revenue: movie.revenue || null,
  runtime: movie.runtime || null,
  spoken_languages: movie.spoken_languages || null,
  status: movie.status || null,
  tagline: movie.tagline || null,
  title: movie.title || null,
  video: movie.video || null,
  vote_average: movie.vote_average || null,
  vote_count: movie.vote_count || null,
});

const searchMovies = async (
  parent: any,
  { keyword }: { keyword: string },
  context: any
) => {

  if (context.userId) {
    console.log(`now I can do some custom action based on userId ${context.userId}`);
  }

  try {
    const apiKey = TMDB_API_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURI(
        keyword
      )}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const formattedMovies = data.results.map((movie: Movie) => resolveMovie(movie));
      return formattedMovies;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching movie data");
  }
};

const getMovieById = async (parent: any, { id }: { id: number }, context: any) => {
  if (context.userId) {
    console.log(`now I can do some custom action based on userId ${context.userId}`);
  }

  try {
    const apiKey = TMDB_API_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    );
    const movie = await response.json();

    if (movie) {
      const resolvedMovie = resolveMovie(movie);
      return resolvedMovie;
    } else {
      throw new Error("Movie not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching movie data");
  }
};

export const moviesResolvers = {
  queries: {
    searchMovies,
    getMovieById,
  },
};
