import express from "express";
const { ApolloServer, gql } = require('apollo-server-express');
import cors from "cors";
// import graphQlHttp from "express-graphql";
import log from "fancy-log";
import mongoose from "mongoose";
import { resolvers, apolloResolvers } from "./graphql/resolvers";
import { schema, typeDefs } from "./graphql/schema";
import { context } from "./helpers";

const app = express();

app.use(express.json());
app.use(cors());

// app.use('/graphql', graphQlHttp({
//   schema: schema,
//   rootValue: resolvers,
//   graphiql: true,
// }));

const server = new ApolloServer({
  typeDefs,
  resolvers: apolloResolvers,
  context: context,
});
server.applyMiddleware({ app });

const port = parseInt(process.env.NODE_ENV === "test" ? 8378 : process.env.PORT, 10) || 8000;

mongoose.connect('mongodb://localhost/events', {useNewUrlParser: true})
  .then(() => {
    app.listen(port, () => {
      log(`Server is running on http://localhost:${port}${server.graphqlPath}`);
    });
  })
  .catch(err => log(err));

export default app;
