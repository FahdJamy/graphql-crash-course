import { Event, User } from "../../models"
import { dateToString } from "../../utils/date";

export default {
  events: () => {
    return Event.find()
      .populate('creator')
      .lean()
      .then(events => {
        return events.map(event => {
          return { ...event, date: dateToString(event.date) };
        });
      })
      .catch((err) => { throw err; });
  },
  createEvent: async (root, args, context) => {
    if (!context.currentUser) { throw new Error('Please provide a valid token'); }
    const { eventInput : { title, description, price } } = args;
    const newEvent = new Event({
      title: title,
      description: description,
      price: +price,
      date: new Date().toISOString(),
      creator: context.currentUser._id,
    })
    try {
      const result = await newEvent.save();
      const user = await User.findOne({_id: result._doc.creator});
      await user.createdEvents.push(result);
      await user.save();
      return { ...result._doc, date: dateToString(result._doc.date), creator: user };
    } catch (err) {
      throw err;
    };
  }
}
