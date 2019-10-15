import jwt from "jsonwebtoken";
import log from "fancy-log";

export const getUserDecodingToken = async ( token ) => {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    return payload;
  } catch (error) {
    log(error);
    return null;
  }
};
