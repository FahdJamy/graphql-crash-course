import express from "express";
import cors from "cors";
import graphQlHttp from "express-graphql";
import log from "fancy-log";
import { buildSchema } from "graphql";
import mongoose from "mongoose";

import Event from "./models/event";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/graphql', graphQlHttp({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event!
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return Event.find()
        .then(events => {
          console.log(events);
          return events;
        })
        .catch(err => {
          throw err;
        });
    },
    createEvent: (args) => {
      const { eventInput : { title, description, price } } = args;
      const event = {
        title: title,
        description: description,
        price: +price,
        date: new Date().toISOString(),
      };
      const newEvent = new Event(event)
      return newEvent.save()
        .then(res => {
          return res
        })
        .catch(err => {
          throw err
        });
    }
  },
  graphiql: true,
}));

const port = parseInt(process.env.NODE_ENV === "test" ? 8378 : process.env.PORT, 10) || 8000;

mongoose.connect('mongodb://localhost/events', {useNewUrlParser: true})
  .then(() => {
    app.listen(port, () => {
      log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => console.log(err));

export default app;
