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
  cancelBooking:  async (parent, { bookingId }, { currentUser }) => {
    if (!currentUser) { throw new Error('Please provide a valid token'); }
    try {
      const bookedEvent = await Booking.findOne({ _id: bookingId }).populate('event user');
      if (!bookedEvent) {
        throw new Error('No booking with that id event exists');
      } else if (bookedEvent.user.id !== currentUser._id) {
        throw new Error("Sorry you can't cancel a booking you didn't book");
      }
      const { event, user } = bookedEvent;
      await Booking.deleteOne({ _id: bookingId });
      return { ...event._doc, _id: event.id, creator: { ...user._doc } }
    } catch (error) {
      // console.log(error);
      throw new Error('No booking with that id exists');
    }
    
  },
};
