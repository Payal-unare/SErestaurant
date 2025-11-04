// routes/contact.routes.js
const express = require("express");
const router = express.Router();
const contactController = require("../controller/contact.controller");

// POST /api/contact
router.post("/", contactController.createContact);

// GET /api/contact (optional for admin)
router.get("/", contactController.getAllContacts);

module.exports = router;
