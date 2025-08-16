import jwt, { Secret, SignOptions } from "jsonwebtoken";

function getExpiresIn(value: string | undefined): SignOptions["expiresIn"] {
  if (!value) throw new Error("invalid secret key");
  return value as SignOptions["expiresIn"];
}

export const createJWT = (payload: Record<string, string>) => {
  const options: SignOptions = {
    expiresIn: getExpiresIn(process.env.JWT_EXPIRES_IN),
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET as Secret, options);
  return token;
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
  return decoded;
};
