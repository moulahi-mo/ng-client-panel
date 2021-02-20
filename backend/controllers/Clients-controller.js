const Client = require("../models/clients");
//! post
const Client_ADD_POST = (req, res) => {
  const client = new Client(req.body);

  client
    .save()
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(next);
};
//! get
const Clients_FetchALL_GET = (req, res, next) => {
  Client.find()
    .then((clients) => {
      res.status(200).json({ docs: clients });
    })
    .catch(next);
};

// !get by id

const Client_BYID_GET = (req, res, next) => {
  const id = req.params.id;
  Client.findById(id)
    .then((response) => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(next);
};

//! delete
const Client_BYID_DELETE = (req, res, next) => {
  const id = req.params.id;
  Client.deleteOne({ _id: id })
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: "doc deleted" + " " + data });
    })
    .catch(next);
};

//! put
const Client_BYID_UPDATE = (req, res, next) => {
  Client.updateOne({ _id: req.params.id }, req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(next);
};

module.exports = {
  Client_ADD_POST,
  Clients_FetchALL_GET,
  Client_BYID_GET,
  Client_BYID_DELETE,
  Client_BYID_UPDATE,
};
