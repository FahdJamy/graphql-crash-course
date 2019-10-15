import eventResolver from "./events";
import userResolvers from "./user";
import bookingResolvers from "./bookings";

export const resolvers = {
  ...eventResolver,
  ...userResolvers,
  ...bookingResolvers,
};

export const apolloResolvers = {
  Query: {
    getEvents: eventResolver.events,
    login: userResolvers.login,
    bookings: bookingResolvers.bookings,
  },
  Mutation: {
    createEvent: eventResolver.createEvent,
    createUser: userResolvers.createUser,
    bookEvent: bookingResolvers.bookEvent,
  },
};
