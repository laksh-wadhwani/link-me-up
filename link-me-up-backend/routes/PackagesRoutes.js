const express = require('express')
const router = express.Router();

const {UploadPackage, GetPackageDetails, UpdatePackage, DeletePackage, GetRejectedPackageDetails}  = require('../controllers/PackagesController')
const {UploadPackageProfile} = require('../middleware/Multer');
const upload = require('../middleware/Multer');

router.post("/UploadPackage", upload.single("PackageProfile"), UploadPackage)
router.get("/GetPackageDetails/:id", GetPackageDetails)
router.get("/GetRejectedPackageDetails/:id", GetRejectedPackageDetails)
router.put("/UpdatePackage/:packageID", upload.single("PackageProfile"), UpdatePackage)
router.delete("/DeletePackage/:id", DeletePackage)

module.exports = router;