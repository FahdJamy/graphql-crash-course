import { getUserDecodingToken } from ".";

export const context = async ({ req }) => {
  let authToken = null;
  let currentUser = null;
  const tokenWithBearer = req.headers.authorization || ''

  try {
    const token = tokenWithBearer.split(' ')[1]
    currentUser = await getUserDecodingToken(token);

    if (token) currentUser = await getUserDecodingToken(authToken);
  } catch (e) {
    console.log(e);
    // console.warn(`Unable to authenticate using auth token: ${authToken}`);
  }
  console.log(currentUser);
  return { currentUser };
};
