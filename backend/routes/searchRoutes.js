// /routes/searchRoutes.js
const express = require('express');
const { searchByBundleName } = require('../controllers/searchController');
const {suggestByBundleName} = require('../controllers/searchController')
const {createLicense} = require('../controllers/searchController')
const {getLicenses} = require('../controllers/searchController');
const authMiddleware = require('../middlewares/auth');
const {deleteLicense} = require('../controllers/searchController')


const router = express.Router();

router.post('/search-bundle',authMiddleware , searchByBundleName);
router.get('/suggest-bundles',authMiddleware ,  suggestByBundleName);
router.post('/create-license',authMiddleware , createLicense);
router.get('/licenses',authMiddleware, getLicenses);
router.delete('/licenseDelete/:id', authMiddleware, deleteLicense)

module.exports = router;
