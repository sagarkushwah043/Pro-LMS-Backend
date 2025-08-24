import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // if (!authHeader || authHeader !== `Bearer ${process.env.FAKE_TOKEN}`) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }
  next();
};
