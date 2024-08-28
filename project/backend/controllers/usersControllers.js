const mongoose = require("mongoose");
const UsersCollection = mongoose.model("User");
const queryHelper = require("../helpers/query");
const CryptoJS = require("crypto-js");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

class usersController {
  async userRegister(req, res) {
    try {
      let bData = req.body;
      const inslen = Object.keys(bData).length;
      if (inslen === 0) {
        return res
          .status(400)
          .send({ status: false, message: "No data provided..." });
      } else {
        let encryPassword = CryptoJS.AES.encrypt(
          bData["password"],
          config.PASSWORD_SECRET
        ).toString();
        bData["password"] = encryPassword;
        let addUsers = await queryHelper.insertData(UsersCollection, bData);
        if (addUsers.status) {
          res
            .status(addUsers.code)
            .send({
              status: addUsers.status,
              data: addUsers.msg,
              message: "User added successfully...",
            });
        } else {
          res
            .status(addUsers.code)
            .send({ status: addUsers.status, message: addUsers.msg });
        }
      }
    } catch (error) {
      console.log("userRegister error", error);
    }
  }
  async userLogin(req, res) {
    try {
      let bData = req.body;
      const inslen = Object.keys(bData).length;
      if (inslen < 2) {
        return res
          .status(400)
          .send({ status: false, message: "No data provided..." });
      } else {
        let userData = await UsersCollection.findOne({ email: bData.email });
        if (!userData) {
          return res
            .status(404)
            .send({ status: false, message: "Cannot find user" });
        }
        if (bData["password"] !== "") {
          var bytes = CryptoJS.AES.decrypt(
            userData["password"],
            config.PASSWORD_SECRET
          );
          var decryptPassword = bytes.toString(CryptoJS.enc.Utf8);
          if (decryptPassword !== bData["password"]) {
            return res
              .status(401)
              .json({ status: false, message: "Invalid credentials" });
          } else {
            const token = jwt.sign(
              { userId: userData._id },
              config.JWT_SECRET,
              {
                expiresIn: "1h",
              }
            );
            return res
              .status(200)
              .json({ status: true, message: "Login successful", data: token });
          }
        } else {
          return res
            .status(400)
            .json({ status: false, message: "Password is required" });
        }
      }
    } catch (error) {
      console.log("err", error);

      return res
        .status(500)
        .send({ status: false, message: "Something went wrong..." });
    }
  }
  async getUsers(req, res) {
    try {
        let users = await UsersCollection.find().sort({_id:-1})
        res.status(200).json({data:users})
    } catch (error) {
      return res
        .status(500)
        .send({ status: false, message: "Something went wrong..." });
    }
  }
}

module.exports = new usersController();
