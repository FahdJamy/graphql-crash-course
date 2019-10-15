import { authentication } from ".";

export const context = async ({ req }) => {
  let authToken = null;
  let currentUser = null;

  try {
    authToken = req.headers[Authorization];

    if (authToken) currentUser = await authentication(authToken);
  } catch (e) {
    console.warn(`Unable to authenticate using auth token: ${authToken}`);
  }

  return { authToken, currentUser };
};
