const Data = require("../models/data.model");

exports.create = (req, res) => {
  //validate the request
  if (
    !req.body.name ||
    !req.body.detail ||
    !req.body.info
  ) {
    return res.status(400).send({
      message: "Data details cannot be empty"
    });
  }
  // Create a new user
  const data = new Data({
    name: req.body.name,
    detail: req.body.detail,
    info: req.body.info
  });

  //save the data in the database
  data
    .save()
    .then(record => {
      res.status(200).send(record);
    })
    .catch(err =>
      res.status(500).send({
        message: err.message || "Some error occurred while creating the data."
      })
    );
};
exports.findAll = (req, res) => {
  Data.find()
    .then(record => {
      res.status(200).send(record);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving your data."
      });
    });
};
exports.findOne = (req, res) => {
  Data.findById(req.params.dataID)
    .then(record => {
      if (!record) {
        return res.status(404).send({
          message: `No data found with id ${req.params.dataID}`
        });
      }
      res.status(200).send(data);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `No data found with id ${req.params.dataID}`
        });
      }
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while finding  the data with id ${
            req.params.dataID
          }`
      });
    });
};
exports.update = (req, res) => {
  if (
    !req.body.name ||
    !req.body.detail ||
    !req.body.info
  ) {
    return res.status(400).send({
      message: "Data details cannot be empty"
    });
  }
  Data.findByIdAndUpdate(
    req.params.dataID,
    {
      name: req.body.name,
      detail: req.body.detail,
      info: req.body.info
    },

    { new: true }
  )
    .then(record => {
      if (!record) {
        return res.status(404).send({
          message: `No data found with the id ${req.params.dataID}`
        });
      }
      res.send(data);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `No data found with the id ${req.params.dataID}`
        });
      }
      res.status(500).send({
        message: `Error updating data with id ${req.params.dataID}`
      });
    });
};
exports.delete = (req, res) => {
  Data.findByIdAndRemove(req.params.dataID)
    .then(record => {
      if (!record) {
        return res.status(404).send({
          message: `No data found with the id ${req.params.dataID}`
        });
      }
      res.send({
        message: "Data Deleted Successfully"
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: `No data found with the id ${req.params.dataID}`
        });
      }
      res.status(500).send({
        message: `Error deleting data with id ${req.params.dataID}`
      });
    });
};
