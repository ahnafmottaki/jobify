import "express"; // 👈 must import, so TS knows which module we’re extending

declare module "express-serve-static-core" {
  interface Request {
    user: {
      userId: string;
      role: string;
      testUser: boolean;
    };
  }
}
