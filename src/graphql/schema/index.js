import { buildSchema } from "graphql";
const { gql } = require('apollo-server-express');

export const schema = buildSchema(`
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }

  type Booking {
    _id: ID!
    user: User!
    event: Event!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    createdEvents: [Event!]
  }

  type AuthData {
    email: String!
    username: String!
    token: String!
    tokenExp: Int!
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
  }

  input UserInput {
    password: String!
    email: String
    username: String
  }

  type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {
    createEvent(eventInput: EventInput): Event!
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

export const typeDefs = gql`
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }

  type Booking {
    _id: ID!
    user: User!
    event: Event!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    createdEvents: [Event!]
  }

  type AuthData {
    email: String!
    username: String!
    token: String!
    tokenExp: Int!
  }

  input EventInput {
    title: String!
    description: String!
    price: Float!
  }

  input UserInput {
    password: String!
    email: String
    username: String
  }

  type Query {
    getEvents: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
  }

  # type RootQuery {
  #   events: [Event!]!
  #   bookings: [Booking!]!
  #   login(email: String!, password: String!): AuthData!
  # }

  type Mutation {
    createEvent(eventInput: EventInput): Event!
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  }


  type RootMutation {
    createEvent(eventInput: EventInput): Event!
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  }
`;
