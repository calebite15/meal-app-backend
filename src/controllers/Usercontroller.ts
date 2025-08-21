const Usermodel = require("../models/Usermodel");
const bcrypt = require("bcryptjs");

const SignUp = async (req: any, res: any) => {
  const { firstname, lastName, phonenumber, Email, password, favouritemeal } =
    req.body;
  try {
    ///check is task exists in data base
    const UserExist = await Usermodel.findOne({ Email });
    if (UserExist) {
      res.status(405).json({
        message: "USER already exists",
      });
    }
    ///to create new task
    const createNewUser = await Usermodel.create({
      firstname,
      lastName,
      phonenumber,
      Email,
      password,
      favouritemeal,
    });
    const taskResult = await createNewUser.save();
    res.status(200).json({
      firstname: taskResult.firstname,
      lastName: taskResult.lastName,
      Email: taskResult.Email,
      phonenumber: taskResult.phonenumber,
      favouritemeal: taskResult.favouritemeal,
    });
  } catch (error) {
    res.status(404).json({ message: "failed to fecth data" });
  }
};

const loginUser = async (req: any, res: any) => {
  const { Email, password } = req.body;
  try {
    // === To check if task exist in the DB under task collection ===
    const userExist = await Usermodel.findOne({ Email });
    if (!userExist) {
      return res.status(405).json({
        message: "user not found",
      });
    }

    const validPassword = await bcrypt.compare(password, userExist.password);
    if (!validPassword) {
      return res.status(405).json({
        message: "invalid password",
      });
    }

    // === To return data if successful ===
    // res.status(200).json(taskResult)

    // ** Alternative to the above **
    res.status(200).json({
      message: "Log in successful",
      _id: userExist._id,
      firstname: userExist.firstname,
      lastName: userExist.lastName,
      phonenumber: userExist.phonenumber,
      Email: userExist.Email,
      favouritemeal: userExist.favouritemeal,
      Isadmin: userExist.Isadmin,
      role: userExist.role,
    });
  } catch (error) {
    res.status(404).json({
      message: "login error",
    });
  }
};
module.exports = { SignUp, loginUser };
