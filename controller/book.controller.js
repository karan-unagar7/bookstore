import { bookModel } from "../model/book.model.js";
import { message } from "../utility/message.utility.js";

// export const bookController = {
//   createBook: async (req, res) => {
//     try {
//       const findUser = await userModel.findById(req.user?._id);
//       if (!findUser) {
//         const response = {
//           statusCode: 404,
//           success: false,
//           message: "User Not Found",
//         };
//         return res.status(200).json(response);
//       }
//       const data = req.body;

//       const book = new bookModel({...data , userId:findUser._id});
//       await book.save();

//       const response = {
//         statusCode: 201,
//         success: true,
//         book: book,
//         message: "create new Books successfully",
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
//   getAllBook: async (req, res) => {
//     try {
//       const findUser = await userModel.findById(req.user?._id);
//       if (!findUser) {
//         const response = {
//           statusCode: 404,
//           success: false,
//           message: "User Not Found",
//         };
//         return res.status(200).json(response);
//       }
//       const allBook = await bookModel.find({userId: findUser._id})
//       const response = {
//         statusCode: 200,
//         success: true,
//         AllBook: allBook,
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
//   getBook: async (req, res) => {
//     try {
//       const findUser = await userModel.findById(req.user?._id);
//       if (!findUser) {
//         const response = {
//           statusCode: 404,
//           success: false,
//           message: "User Not Found",
//         };
//         return res.status(200).json(response);
//       }
//       const id = req.params.id;
//       const findbook = await bookModel.findOne({$and:[{userId: findUser._id},{_id:id}]});

//       if(!findbook){
//         const response = {
//           statusCode: 404,
//           success: false,
//           message: "Not Found",
//         };
//         return res.status(200).json(response);
//       }

//       const response = {
//         statusCode: 200,
//         success: true,
//         book: findbook,
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
//   deleteBook: async (req, res) => {
//     try {
//       const findUser = await userModel.findById(req.user?._id);
//       console.log(findUser);
//       if (!findUser) {
//         const response = {
//           statusCode: 404,
//           success: false,
//           message: "User Not Found",
//         };
//         return res.status(200).json(response);
//       }
//       const id = req.params.id;
//       console.log(id);
//       const deleteBook = await bookModel.findOneAndDelete({$and:[{userId: findUser._id},{_id:id}]});
//       console.log(deleteBook);
//       if(!deleteBook){
//         const response = {
//           statusCode: 404,
//           success: false,
//           message: "Not Found",
//         };
//         return res.status(200).json(response);
//       }
//       const response = {
//         statusCode: 200,
//         success: true,
//         message: "Delete Successfully",
//         deletedBook: deleteBook,
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
//   updateBook: async (req, res) => {
//     try {
//       const findUser = await userModel.findById(req.user?._id);
//       if (!findUser) {
//         const response = {
//           statusCode: 404,
//           success: false,
//           message: "User Not Found",
//         };
//         return res.status(200).json(response);
//       }
//       const id = req.params.id;
//       const data = req.body;
//       const updatedBook = await bookModel.findOneAndUpdate({$and:[{userId: findUser._id},{_id:id}]}, data, {
//         new: true,
//       });
//       if(!updatedBook){
//         const response = {
//           statusCode: 404,
//           success: false,
//           message: "Not Found",
//         };
//         return res.status(200).json(response);
//       }
//       const response = {
//         statusCode: 200,
//         success: true,
//         message: "Update Successfully",
//         upadtedBook: updatedBook,
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
// };

export const createBook = async (req, res) => {
  try {
    const userDetail = req.user;
    console.log(userDetail);
    if (!userDetail) {
      return res.status(404).json({ message: message.user.userNotfound });
    }

    const {
      name,
      description,
      no_of_page,
      author,
      category,
      price,
      released_year,
    } = req.body;

    const book = new bookModel({
      name,
      description,
      no_of_page,
      author,
      category,
      price,
      released_year,
      userId: userDetail._id,
    });
    await book.save();

    return res.status(201).json({ message: message.book.newBookCreate });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const userDetail = req.user;
    if (!userDetail) {
      return res.status(404).json({ message: message.user.userNotfound });
    }

    const allBook = await bookModel.find({ userId: userDetail._id });
    if (!allBook) {
      return res.status(404).json({ message: message.book.bookNotFound });
    }

    return res.status(200).json({ AllBook: allBook });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOneBook = async (req, res) => {
  try {
    const userDetail = req.user;
    if (!userDetail) {
      return res.status(404).json({ message: message.user.userNotfound });
    }

    const id = req.params.id;
    const bookDetail = await bookModel.findOne({
      $and: [{ userId: userDetail._id }, { _id: id }],
    });

    if (!bookDetail) {
      return res.status(404).json({ message: message.book.bookNotFound });
    }

    return res.status(200).json({ Book: bookDetail });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const userDetail = req.user;
    if (!userDetail) {
      return res.status(404).json({ message: message.user.userNotfound });
    }

    const id = req.params.id;
    const {
      name,
      description,
      no_of_page,
      author,
      category,
      price,
      released_year,
    } = req.body;
    const updatedBook = await bookModel.findOneAndUpdate(
      { $and: [{ userId: userDetail._id }, { _id: id }] },
      {
        name,
        description,
        no_of_page,
        author,
        category,
        price,
        released_year,
        userId: userDetail._id,
      },
      {
        new: true,
      }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: message.book.bookNotFound });
    }

    return res.status(200).json({ message: message.book.updateBook });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const userDetail = req.user;
    if (!userDetail) {
      return res.status(404).json({ message: message.user.userNotfound });
    }

    const id = req.params.id;
    const deleteBook = await bookModel.findOneAndDelete({
      $and: [{ userId: userDetail._id }, { _id: id }],
    });

    if (!deleteBook) {
      return res.status(404).json({ message: message.book.bookNotFound });
    }

    return res.status(200).json({ message: message.book.deleteBook });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

