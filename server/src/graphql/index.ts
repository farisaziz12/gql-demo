import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";

export const typeDefs = loadFilesSync(path.join(__dirname, './schemas'), { extensions: ['gql'] });

export { default as resolvers } from "./resolvers";