import asyncHandler from "../utils/asyncHandler";

export const register = asyncHandler(async (req, res, next) => {
  res.send("register");
});

export const login = asyncHandler(async (req, res) => {
  res.send("login");
});
