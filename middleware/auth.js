import { userModel } from "../model/user.model.js";
import { message } from "../utility/message.utility.js";
import { verifyToken } from "../utility/token.utility.js";

export const verifyUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.Token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: message.user.badRequest });
    }

    const decodeToken = verifyToken(token);
    // console.log(decodeToken);

    if (!decodeToken) {
      return res.status(401).json({ message: message.user.userUnauthorize });
    }

    const user = await userModel.findById(decodeToken?.id).select("-password");
    // console.log(user);

    if (!user) {
      return res.status(404).json({ message: message.user.userNotfound });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
