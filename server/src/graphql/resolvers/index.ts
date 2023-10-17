import { moviesResolvers } from "./movies";

const resolvers = {
  Query: {
    ...moviesResolvers.queries,
  },
};

export default resolvers;
