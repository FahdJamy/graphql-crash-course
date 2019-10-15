import express from "express";
const { ApolloServer } = require('apollo-server-express');
import cors from "cors";
import log from "fancy-log";
import mongoose from "mongoose";
import { apolloResolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";
import { getUserDecodingToken } from "./helpers";
import { UpperCaseDirective, DateFormatDirective } from "./graphql/directive";

const app = express();

app.use(express.json());
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  schemaDirectives: {
    upperCase: UpperCaseDirective,
    date: DateFormatDirective,
  },
  resolvers: apolloResolvers,
  context: async ({ req }) => {
    let currentUser = null;
    const tokenWithBearer = req.headers.authorization || '';

    try {
      const token = tokenWithBearer.split(' ')[1];
      if (token) currentUser = await getUserDecodingToken(token);
    } catch (e) {
      log(e);
    }
    return { currentUser };
  },
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
