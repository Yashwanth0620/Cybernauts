const express = require("express");
const router = express.Router();
const { sendCertificates } = require("../controllers/certificate.controller");

router.post("/:id", sendCertificates);

module.exports = router;
