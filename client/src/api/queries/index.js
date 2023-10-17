import { loader } from "graphql.macro";


const GET_MOVIE_BY_ID = loader("./getMovieById.gql");

export const QUERIES = {
    GET_MOVIE_BY_ID,
};