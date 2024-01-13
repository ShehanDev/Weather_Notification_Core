import { validatePassword, getUserByName } from "./userService.js";
import jwt from "jsonwebtoken";

// login user
export const login = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const user = await getUserByName(name);
    if (!user) {
      res.status(401).json({
        message: "invalid Login ",
        error: "User not found",
      });
    } else {
      const isMatch = await validatePassword(password, user.password);
      if (!isMatch) {
        res.status(401).json({
          message: "invalid Login",
          error: "wrong  password",
        });
      }
      const token = generateToken(user);

      res.status(200).json({
        token,
        message: "successfully login..",
        user,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

//generate Token
export const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.name,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

//verify token token service
export const verifyToken = (req, res, next) => {
  const tokenHeder = req.headers.authorization;

  const token = tokenHeder.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "provide the token !",
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      // console.log("decoded", decoded);
      if (err) {
        res.status(401).json({
          message: "Invalid token",
          error: err.message,
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};
