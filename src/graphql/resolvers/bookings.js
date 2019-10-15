import { Booking } from "../../models"

export default {
  bookings: async (args) => {
    return Booking.find()
      .populate('user')
      .populate('event')
      .then(bookings => {
        return bookings;
      })
      .catch(err => {
        throw err;
      });
  },
  bookEvent: async (args) => {
    const { eventId } = args;
    const bookedEvent = new Booking({
      event: eventId,
      user: "5d9ef0329a646d7b2ff56e56",
    });
    return bookedEvent.save()
      .then(res => {
        return res;
      })
      .catch(err => {
        throw err;
      });
  },
};
