const express = require('express');
const router = express.Router();

const {SignUp, VerifyOTP, UpdateInfo, SignIn, ForgetPassword, SystemPosts, SystemReply, AccountDetails, GetReceiptForProvider, PaymentAcknowledgement} = require("../controllers/ProviderController");
const upload = require('../middleware/Multer');

router.post("/SignUp", upload.single("ProviderProfile"), SignUp)
router.post("/VerifyOTP", VerifyOTP)
router.put("/UpdateInfo/:ispID", upload.single("ProviderProfile"), UpdateInfo)
router.post("/SignIn", SignIn)
router.post("/ForgetPassword", ForgetPassword)
router.get("/SystemPosts/:ispID", SystemPosts)
router.put("/SystemReply/:detailsID/:ispID", SystemReply)
router.put("/AccountDetails/:email", AccountDetails)
router.get("/GetReceiptForProvider/:ispID", GetReceiptForProvider)
router.put("/PaymentAcknowledgement/:transactionID", PaymentAcknowledgement)

module.exports = router