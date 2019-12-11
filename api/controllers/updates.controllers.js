const Updates = require('../models/updates.model');


const getUpdates = (req, res) => {
  Updates.find({ isAlertActive: false })
  .then(updates => {
    let inactive = [];
    updates.map(update => {
      inactive.push({ _id: update._id, matric_no: update.matric_no, location: update.locationUrl });
    });
    console.log(inactive);
    res.status(200).json(inactive);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      msg: `Something went wrong`
    });
  });
}

const selectUpdate = (req, res) => {
  const { id } = req.body;
  Updates.findById(id)
  .then(update => {
    update.isAlertActive = true;
    update.save()
    .then(doc => {
      console.log(doc);
      res.status(200).json({
        msg: `This student has been selected`,
        data: doc
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        err: `Something went wrong`
      });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({
      err: `Update not found`
    });
  });
}




module.exports = {
  getUpdates,
  selectUpdate,
}