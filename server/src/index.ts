import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { mergeTypeDefs } from "@graphql-tools/merge";
import Base64 from "base64-js";
import dotenv from "dotenv";
import cors from "cors";
import { json } from "body-parser";
import express from "express";
import { typeDefs, resolvers } from "./graphql";
import { GraphQLError } from "graphql";

dotenv.config();

const startServer = async () => {
  const graphQLServer = new ApolloServer({
    typeDefs: mergeTypeDefs(typeDefs),
    resolvers,
  });

  await graphQLServer.start();

  const app = express();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(graphQLServer, {
      context: async ({ req }) => {
        // You can add your context logic here.
        // For example, you can access headers from the req object.
        // You can return an object representing your context.

        const { token } = req.headers;

        if (!token) {
          throw new GraphQLError("You are not authorized to perform this action.", {
            extensions: {
              code: "FORBIDDEN",
            },
          });
        }

        // Decode the Base64 string
        const buff = new Buffer(token as string, 'base64');
        const decodedString = buff.toString('ascii');

        const { userid } = JSON.parse(decodedString);

        const context = {
          // You can add any data you want to the context here.
          // For example, you might want to authenticate the user based on the request headers.
          // This is just a placeholder example.
          authToken: token,
          userId: userid,
        };
        return context;
      },
    })
  );

  const port = process.env.PORT || 4000; // Default to 4000 if PORT is not specified in .env

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
};

startServer();
