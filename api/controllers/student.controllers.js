const Students = require('../models/students.model');
const jwt = require('jsonwebtoken');
const degtoDMS = require('../config/degtoDMS');
const Updates = require('../models/updates.model');
const axios = require('axios');

const create = (req, res) => {
  console.log(req.body);
  const { matric_no, firstname, middlename, lastname, level, hallOfResidence } = req.body;
  const student = new Students({
    matric_no,
    firstname,
    middlename,
    lastname,
    level,
    hallOfResidence
  })
  student.save()
  .then(doc => {
    console.log(doc);
    res.status(200).json({
      doc,
      message: `Student data stored successfully`
    });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: `Something went wrong`
    });
  });
}

const login = (req, res) => {
  console.log(req.body);
  const { matric_no } = req.body;
  Students.findOne({ matric_no })
  .then(student => {
    console.log(`Student found \n ${student}`);
    const { firstname, lastname, middlename } = student;
    const token = jwt.sign({ matric_no, firstname, lastname, middlename }, process.env.jwtSecret);
    res.cookie('token', token, {
      expire: new Date() + 9999999999
    });
    res.status(200).json(student);
  })
  .catch(err => {
    console.log(err);
    res.status(401).json({
      error: `Auth failed`
    })
  })
}

const sendAlert = async (req, res) => {
  const { long, lat } = req.body;
  const { matric_no, firstname, lastname, middlename } = req.profile;
  const lng = degtoDMS(long);
  const lt = degtoDMS(lat);
  const locationUrl = `https://google.com/maps/search/${lng}${lt}`;
  axios.post('https://shorten--url.herokuapp.com/api/url/shorten', {"longUrl":locationUrl})
  .then(response => {
    location = response.data.shortUrl;
    console.log(location);
    const update = new Updates({
      matric_no,
      locationUrl: location
    });
    update.save()
    .then(doc => {
      console.log(doc);
      res.status(200).json({
        doc,
        message: `Student matric_no ${matric_no} is in trouble at location ${location}`
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error : `Something went wrong`
      })
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      err: `Something went wrong`
    })
  })
}


const savedUpdate = (req, res) => {
  const { id } = req.body;
  Updates.findById(id)
  .then(update => {
    if (!update.saved){
      update.saved = true;
      update.save()
      .then(doc => {
        console.log(doc);
        res.status(200).json({
          msg: `This student is saved`
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          msg: `Something went wrong`
        });
      });
  }else{
    res.status(400).json({
      msg: `User is saved already`
    })
  }
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({
      msg: `Not found`
    })
  })
}


module.exports = {
  create,
  login,
  sendAlert,
  savedUpdate
}