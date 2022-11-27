const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.registerUser = async (req, res, next) => {
  const data = req.body;
  const encryptedPassword = await bcrypt.hash(data.password, 12);

  try {
    const checkEmail = await User.findOne({ email: data.email });
    if (checkEmail) {
      return res.status(422).send({
        message: "User with this email already exists",
        status: "error",
        error: true,
      });
    }

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: encryptedPassword,
    });

    res.status(201).send({
      message: "User registered",
      status: "success",
      userId: user._id.toString(),
    });
  } catch (err) {
    if ((err.code = "11000")) {
      return res.status(422).send({
        message: "Please choose a different username",
        status: "failed",
      });
    }
    return res.status(500).send({
      message: "server error",
      errorMessage: err.message,
      errorCode: err.code,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  const data = req.body;

  try {
    const user = await User.findOne({
      email: data.email,
    });

    if (user) {
      const isCorrectPassword = await bcrypt.compare(
        data.password,
        user.password
      );
      if (isCorrectPassword) {
        const token = jwt.sign(
          {
            userId: user._id.toString(),
            email: user.email,
          },
          "x1PcVJcmfjarIjgDlrStYadD9AabNK"
        );
        user.save();

        res.status(200).send({
          message: "User logged in",
          status: "success",
          userToken: token,
        });
      } else {
        return res
          .status(422)
          .send({ message: "Password does not match", status: "failed" });
      }
    } else {
      return res
        .status(401)
        .send({ message: "User not found", status: "failed" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "User cannot be saved at this time",
      status: "failed",
      errorMessage: err.message,
      errorCode: err.code,
    });
  }
};