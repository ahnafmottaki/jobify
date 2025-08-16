import bcrypt from "bcryptjs";

const hashPassword = async (value: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value, salt);
  return hashedPassword;
};

export const comparePassword = async (
  value: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(value, hashedPassword);
};

export { hashPassword };
