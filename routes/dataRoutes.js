const express = require("express")
const { handleIfUserExists } = require("../controller/dataController")
const router = express.Router()


// https:jkjkj/api/v1/data/ifUserExists

router.route("/ifUserExists").get(handleIfUserExists);

module.exports = {router};