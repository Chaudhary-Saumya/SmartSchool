const { pool } = require('../config/database');

// ======================== Add Library Asset ========================
const addLibraryAsset = async (req, res) => {
  const { title, subject_id, purchase_date, asset_type, due_date, shelf_location, status } = req.body;
  const createdBy = req.user.id; // From JWT decoded data

  try {
    // Validate required fields
    if (!title || !subject_id || !purchase_date || !asset_type) {
      return res.status(400).json({
        message: 'Title, subject ID, purchase date, and asset type are required'
      });
    }

    // Validate subject exists
    const [subject] = await pool.execute('SELECT id FROM tbl_subjects WHERE id = ?', [subject_id]);
    if (subject.length === 0) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Validate asset type
    const validAssetTypes = ['Book', 'CD', 'DVD', 'Newspaper'];
    if (!validAssetTypes.includes(asset_type)) {
      return res.status(400).json({
        message: 'Asset type must be one of: Book, CD, DVD, Newspaper'
      });
    }

    // Validate status if provided
    const validStatuses = ['available', 'borrowed', 'damaged', 'lost'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Status must be one of: available, borrowed, damaged, lost'
      });
    }

    // Insert library asset
    const [result] = await pool.execute(
      `INSERT INTO tbl_library_assets
       (title, subject_id, purchase_date, asset_type, due_date, shelf_location, status, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, subject_id, purchase_date, asset_type, due_date || null, shelf_location || null, status || 'available', createdBy]
    );

    res.status(201).json({
      message: 'Library asset added successfully',
      assetId: result.insertId
    });
  } catch (error) {
    console.error('Add Library Asset Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Get All Library Assets ========================
const getAllLibraryAssets = async (req, res) => {
  try {
    const [assets] = await pool.execute(`
      SELECT la.*,
             s.name AS subject_name,
             s.description AS subject_description,
             u.name AS created_by_name
      FROM tbl_library_assets la
      JOIN tbl_subjects s ON la.subject_id = s.id
      JOIN tbl_users u ON la.created_by = u.id
      ORDER BY la.created_at DESC
    `);

    res.status(200).json(assets);
  } catch (error) {
    console.error('Get Library Assets Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Update Library Asset ========================
const updateLibraryAsset = async (req, res) => {
  const { id } = req.params;
  const { title, subject_id, purchase_date, asset_type, due_date, shelf_location, status } = req.body;

  try {
    // Check if asset exists
    const [asset] = await pool.execute('SELECT * FROM tbl_library_assets WHERE id = ?', [id]);
    if (asset.length === 0) {
      return res.status(404).json({ message: 'Library asset not found' });
    }

    // Validate subject exists if provided
    if (subject_id) {
      const [subject] = await pool.execute('SELECT id FROM tbl_subjects WHERE id = ?', [subject_id]);
      if (subject.length === 0) {
        return res.status(404).json({ message: 'Subject not found' });
      }
    }

    // Validate asset type if provided
    const validAssetTypes = ['Book', 'CD', 'DVD', 'Newspaper'];
    if (asset_type && !validAssetTypes.includes(asset_type)) {
      return res.status(400).json({
        message: 'Asset type must be one of: Book, CD, DVD, Newspaper'
      });
    }

    // Validate status if provided
    const validStatuses = ['available', 'borrowed', 'damaged', 'lost'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Status must be one of: available, borrowed, damaged, lost'
      });
    }

    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];

    if (title !== undefined) {
      updateFields.push('title = ?');
      updateValues.push(title);
    }
    if (subject_id !== undefined) {
      updateFields.push('subject_id = ?');
      updateValues.push(subject_id);
    }
    if (purchase_date !== undefined) {
      updateFields.push('purchase_date = ?');
      updateValues.push(purchase_date);
    }
    if (asset_type !== undefined) {
      updateFields.push('asset_type = ?');
      updateValues.push(asset_type);
    }
    if (due_date !== undefined) {
      updateFields.push('due_date = ?');
      updateValues.push(due_date);
    }
    if (shelf_location !== undefined) {
      updateFields.push('shelf_location = ?');
      updateValues.push(shelf_location);
    }
    if (status !== undefined) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(id);

    const updateQuery = `UPDATE tbl_library_assets SET ${updateFields.join(', ')} WHERE id = ?`;

    // Update asset
    await pool.execute(updateQuery, updateValues);

    res.status(200).json({ message: 'Library asset updated successfully' });
  } catch (error) {
    console.error('Update Library Asset Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Delete Library Asset ========================
const deleteLibraryAsset = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if asset exists
    const [asset] = await pool.execute('SELECT * FROM tbl_library_assets WHERE id = ?', [id]);
    if (asset.length === 0) {
      return res.status(404).json({ message: 'Library asset not found' });
    }

    // Delete asset
    await pool.execute('DELETE FROM tbl_library_assets WHERE id = ?', [id]);

    res.status(200).json({ message: 'Library asset deleted successfully' });
  } catch (error) {
    console.error('Delete Library Asset Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addLibraryAsset, getAllLibraryAssets, updateLibraryAsset, deleteLibraryAsset };
