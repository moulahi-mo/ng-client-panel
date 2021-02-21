const Client = require("../models/clients");
//! post
const Client_ADD_POST = (req, res, next) => {
  const client = new Client({ ...req.body, creator: req.userId });

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
  Client.deleteOne({ _id: id, creator: req.userId })
    .then((data) => {
      console.log(data);
      if (data.n > 0) {
        console.log(data);
        res.status(200).json({ message: "doc deleted" + " " + data });
      } else {
        res.status(401).json({ message: "not authorized for this action" });
      }
    })
    .catch(next);
};

//! put
const Client_BYID_UPDATE = (req, res, next) => {
  Client.updateOne({ _id: req.params.id, creator: req.userId }, req.body)
    .then((data) => {
      console.log(data);
      if (data.n > 0) {
        res.status(200).json(data);
      } else {
        res.status(401).json({ message: "not authorized for this action" });
      }
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
