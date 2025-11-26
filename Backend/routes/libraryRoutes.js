const express = require('express');
const { addLibraryAsset, getAllLibraryAssets, updateLibraryAsset, deleteLibraryAsset } = require('../controllers/libraryController');
const { verifyToken, checkRole } = require('../middleware/auth');

const router = express.Router();

// Only Admin can create/update/delete library assets
router.post('/add', verifyToken, checkRole(['admin']), addLibraryAsset);
router.put('/update/:id', verifyToken, checkRole(['admin']), updateLibraryAsset);
router.delete('/delete/:id', verifyToken, checkRole(['admin']), deleteLibraryAsset);

// All logged-in users can view library assets
router.get('/', verifyToken, getAllLibraryAssets);

module.exports = router;
