import jwt from "jsonwebtoken";

export const tokenRequired = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const bearerToken = authHeader.split(' ');
  if (!bearerToken || bearerToken[0] !== 'Bearer') {
    req.isAuth = false;
    throw new Error("Provide token of type 'Bearer'")
  }
  try {
    const payload = jwt.verify(bearerToken[1], process.env.SECRET_KEY);
    if (payload) {
      req.isAuth = true;
      return next();
    }
    req.isAuth = false;
    return next();
  } catch (error) {
    req.isAuth = false;
    throw error;
  }
};
