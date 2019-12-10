const mongoose = require("mongoose");
const User = require("./model/User");
const Alert = require("./model/Alert");

exports.createUser = async (req, res) => {
    const newUser = {
        mat_no: req.body.mat_no,
        name: req.body.name,
        faculty: req.body.name,
        department: req.body.department,
        phone_number: req.body.phone_number,
        next_of_kin: req.body.next_of_kin
    }
    try {
        const user = await User.create(newUser)
        res.status(200).json({message: "User Created", data: user})
    } catch (error) {
        res.status(400).json({message: "An Error Occured"})
    }
};

exports.getProfile = async (req, res) => {
  const mat_number = req.params.mat_no;
  try {
    const user = await User.findOne({ mat_no: mat_number });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User", data: user });
    }
  } catch (error) {
    res.status(400).json({ message: "An Error Occured" });
  }
};

exports.sendSignal = async (req, res) => {
    const mat_number = req.body.mat_no;
    try {
        const user = await User.findOne({ mat_no: mat_number });
        const newAlert = {
            user: user.id,
            location: {
                coordinates: [res.body.longitude, res.body.latitude]
            }
        }
        const alert = await Alert.create(newAlert).populate('User')
        res.status(200).json({message: "Alert Sent", data: alert})
    } catch (error) {
        res.status(400).json({message: "An Error Occured"})
}
};
