import { Booking, User, Event } from "../../models"
import { dateToString } from "../../utils";

export default {
  bookings: async () => {
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
  bookEvent: async (parent, { eventId }, { currentUser }) => {
    if (!currentUser) { throw new Error('Please provide a valid token'); }
    const bookedEvent = new Booking({
      event: eventId,
      user: currentUser._id,
    });
    const user = User.findOne({ email: currentUser.email }).lean();
    const event = Event.findOne({ _id: eventId }).lean();
    return bookedEvent.save()
      .then(res => {
        return {
          ...res,
          updatedAt: dateToString(res._doc.updatedAt),
          createdAt: dateToString(res._doc.updatedAt),
          user,
          event,
        };
      })
      .catch(err => {
        throw err;
      });
  },
};
