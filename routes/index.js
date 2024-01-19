var express = require("express");
var router = express.Router();
require("../models/connection");
const Place = require("../models/places");

//post new places
router.post("/places", async (req, res) => {
  const { nickname, name, latitude, longitude } = req.body;

  const newPlace = new Place({ nickname, name, latitude, longitude });
  newPlace.save().then((newPlace) => {
    res.json({ result: true, data: newPlace });
  });
});
//get place by nickname
router.get("/places/:nickname", (req, res) => {
  //regex to find place regardless of nickname case
  Place.find({
    nickname: { $regex: new RegExp(req.query.nickname, "i") },
  }).then((data) => {
    res.json({ result: true, places: data });
  });
});
//delete place
router.delete("/places", (req, res) => {
  const { nickname, name } = req.body;
  //regex to delete place regardless of nickname case
  Place.deleteOne({
    nickname: { $regex: new RegExp(nickname, "i") },
    name,
  }).then((deletedDoc) => {
    if (deletedDoc.deletedCount > 0) {
      res.json({ result: true });
    } else {
      res.json({ result: false, error: "place not found" });
    }
  });
});
module.exports = router;
