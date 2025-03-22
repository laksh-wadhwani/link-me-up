const express = require("express");
const router = express.Router();

const {SignUp, VerifyOTP, SignIn, GetISPANDPACKAGES, SystemPostRequest, ContactUs, UpdateInfo, MakePayment, GetReceiptForConsumer, SystemReply} = require("../controllers/ConsumerController");
const upload = require("../middleware/Multer");


router.post("/SignUp", upload.single("ConsumerProfile"), SignUp)
router.post("/VerifyOTP", VerifyOTP)
router.post("/SignIn", SignIn)
router.get("/GetISPANDPACKAGES/:cityName", GetISPANDPACKAGES)
router.post("/SystemPostRequest/:userID", SystemPostRequest);
router.post("/ContactUs", ContactUs);
router.put("/UpdateInfo/:userID", upload.single("ConsumerProfile"), UpdateInfo)
router.post("/MakePayment/:userID/:ispID", upload.single("PaymentReceipts"), MakePayment)
router.get("/GetReceiptForConsumer/:userID", GetReceiptForConsumer)
router.get("/SystemReply/:userID", SystemReply)

module.exports = router;