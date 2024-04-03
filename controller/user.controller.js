import { userModel } from "../model/user.model.js";
import { generateToken } from "../utility/token.utility.js";
import { message } from "../utility/message.utility.js";

// export const userController = {
//   signUp: async (req, res) => {
//     try {
//       const data = req.body;

//       const findUser = await userModel.findOne({ email: data.email });

//       if(findUser)
//       {
//         const response = {
//             statusCode: 401,
//             success: false,
//             message: "User already Exicts",
//           };
//           return res.status(200).json(response);
//       }

//       const newUser = new userModel(data)
//       await newUser.save();

//       const response = {
//         statusCode: 201,
//         success: true,
//         user:newUser,
//         message: "user created successfully!",
//       };
//       return res.status(200).json(response);

//     } catch (error) {
//       const response = {
//         statusCode: 500,
//         success: false,
//         message: error.message,
//       };
//       return res.status(200).json(response);
//     }
//   },
//   signIn:async(req,res)=>{
//     try {
//         const {email,password}=req.body

//         const findUser=await userModel.findOne({email})
//         if(!findUser)
//         {
//             const response = {
//                 statusCode: 404,
//                 success: false,
//                 message: "User Not Found",
//               };
//               return res.status(200).json(response);
//         }

//         const matchPass=await findUser.checkPassword(password)
//         // console.log(matchPass);

//         if(!matchPass)
//         {
//             const response = {
//                 statusCode: 401,
//                 success: false,
//                 message: "Invalid Credintial",
//               };
//               return res.status(200).json(response);
//         }

//         const token= generateToken(findUser.id)

//         const response = {
//             statusCode: 200,
//             success: true,
//             Token:token,
//             message: "Sign-in Successfully",
//           };
//           return res.status(200).cookie("Token" , token).json(response);

//     } catch (error) {
//         const response = {
//             statusCode: 500,
//             success: false,
//             message: error.message,
//           };
//           return res.status(200).json(response);
//     }
//   },
//   userProfile:async(req,res)=>{
//     try {

//         const findUser=await userModel.findById(req.user?._id)
//         // console.log(findUser);
//         const response={
//             statusCode: 200,
//             success: true,
//             UserData : findUser,
//         }
//         return res.status(200).json(response);

//     } catch (error) {
//         const response = {
//             statusCode: 500,
//             success: false,
//             message: error.message,
//           };
//           return res.status(200).json(response);
//     }
//   }
// };

let {user}=message;

export const signUp = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    const userDetail = await userModel.findOne({ email });
    if (userDetail) {
      return res.status(401).json({ message:user.userAlreadyExicts });
    }

    const newUser = new userModel({ name, email, password, gender });
    await newUser.save();

    return res.status(201).json({ message:user.signUp });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDetail = await userModel.findOne({ email });
    if (!userDetail) {
      return res.status(404).json({ message:user.userNotfound });
    }

    const matchPass = await userDetail.checkPassword(password);

    if (!matchPass) {
      return res.status(401).json({ message:user.wrongPassword });
    }

    const token = generateToken({ id: userDetail._id });

    if (!token) {
      return res.status(400).json({ message:user.tokenNotGenreted });
    }
    return res
      .status(200)
      .cookie("Token", token)
      .json({Token:token ,message:user.signIn });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req,res)=>{
  try {
    const userDetail=req.user;
    return res.status(200).json({userProfile:userDetail})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// let {name,email,gender,interest}=userDetail;