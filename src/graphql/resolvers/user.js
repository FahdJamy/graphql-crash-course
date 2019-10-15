import bcrypt from "bcryptjs";
import { User } from "../../models"
import jwt from "jsonwebtoken";

export default {
  createUser: async (args) => {
    const { userInput : { email, password, username } } = args;
    let hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    return newUser.save()
      .then(res => {
        return res
      })
      .catch(err => {
        throw err
      });
  },
  login: async (root, args) => {
    const { email, password} = args;
    const user = await User.findOne({ email }).lean();
    if (!user) { throw new Error("Sorry, user with that email doesnot exist")};
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) { throw new Error("You provided invalid credentials")};
    const { username, _id } = user;
    const token = jwt.sign(
      { _id, email: user.email, username },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    return { username, email, token, tokenExp: 86400 };
  },
}
