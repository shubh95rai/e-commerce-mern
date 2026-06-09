import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
};

const setTokenCookie = (res, cookieName, token) => {
  res.cookie(cookieName, token, cookieOptions);
};

const clearTokenCookie = (res, cookieName) => {
  const clearOptions = { ...cookieOptions };
  delete clearOptions.maxAge; // Not needed when clearing
  res.clearCookie(cookieName, clearOptions);
};

const generateUserToken = (userId, res) => {
  const token = jwt.sign({ userId, role: "user" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  setTokenCookie(res, "userToken", token);

  return token;
};

const generateAdminToken = (res) => {
  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  setTokenCookie(res, "adminToken", token);

  return token;
};

export { clearTokenCookie, generateUserToken, generateAdminToken };
