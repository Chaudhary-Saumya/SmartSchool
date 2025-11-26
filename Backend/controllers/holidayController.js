const { pool } = require('../config/database');

// ======================== Add Holiday ========================
const addHoliday = async (req, res) => {
  const { title, start_date, end_date, description, holiday_type, location } = req.body;
  const createdBy = req.user.id; // From JWT decoded data

  try {
    // Validate required fields
    if (!title || !start_date || !end_date || !holiday_type || !location) {
      return res.status(400).json({
        message: 'Title, start date, end date, holiday type, and location are required'
      });
    }

    // Validate date range
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    if (startDate > endDate) {
      return res.status(400).json({
        message: 'Start date cannot be after end date'
      });
    }

    // Validate holiday type
    const validHolidayTypes = ['Public', 'By School'];
    if (!validHolidayTypes.includes(holiday_type)) {
      return res.status(400).json({
        message: 'Holiday type must be either "Public" or "By School"'
      });
    }

    // Validate location
    const validLocations = ['Global', 'School'];
    if (!validLocations.includes(location)) {
      return res.status(400).json({
        message: 'Location must be either "Global" or "School"'
      });
    }

    // Insert holiday
    const [result] = await pool.execute(
      `INSERT INTO tbl_holidays
       (title, start_date, end_date, description, holiday_type, location, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, start_date, end_date, description || null, holiday_type, location, createdBy]
    );

    res.status(201).json({
      message: 'Holiday added successfully',
      holidayId: result.insertId
    });
  } catch (error) {
    console.error('Add Holiday Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Get All Holidays ========================
const getAllHolidays = async (req, res) => {
  try {
    const [holidays] = await pool.execute(`
      SELECT h.*,
             u.name AS created_by_name
      FROM tbl_holidays h
      JOIN tbl_users u ON h.created_by = u.id
      ORDER BY h.start_date DESC
    `);

    res.status(200).json(holidays);
  } catch (error) {
    console.error('Get Holidays Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Update Holiday ========================
const updateHoliday = async (req, res) => {
  const { id } = req.params;
  const { title, start_date, end_date, description, holiday_type, location } = req.body;

  try {
    // Check if holiday exists
    const [holiday] = await pool.execute('SELECT * FROM tbl_holidays WHERE id = ?', [id]);
    if (holiday.length === 0) {
      return res.status(404).json({ message: 'Holiday not found' });
    }

    // Validate date range if both dates are provided
    if (start_date && end_date) {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      if (startDate > endDate) {
        return res.status(400).json({
          message: 'Start date cannot be after end date'
        });
      }
    }

    // Validate holiday type if provided
    const validHolidayTypes = ['Public', 'By School'];
    if (holiday_type && !validHolidayTypes.includes(holiday_type)) {
      return res.status(400).json({
        message: 'Holiday type must be either "Public" or "By School"'
      });
    }

    // Validate location if provided
    const validLocations = ['Global', 'School'];
    if (location && !validLocations.includes(location)) {
      return res.status(400).json({
        message: 'Location must be either "Global" or "School"'
      });
    }

    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];

    if (title !== undefined) {
      updateFields.push('title = ?');
      updateValues.push(title);
    }
    if (start_date !== undefined) {
      updateFields.push('start_date = ?');
      updateValues.push(start_date);
    }
    if (end_date !== undefined) {
      updateFields.push('end_date = ?');
      updateValues.push(end_date);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(description);
    }
    if (holiday_type !== undefined) {
      updateFields.push('holiday_type = ?');
      updateValues.push(holiday_type);
    }
    if (location !== undefined) {
      updateFields.push('location = ?');
      updateValues.push(location);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(id);

    const updateQuery = `UPDATE tbl_holidays SET ${updateFields.join(', ')} WHERE id = ?`;

    // Update holiday
    await pool.execute(updateQuery, updateValues);

    res.status(200).json({ message: 'Holiday updated successfully' });
  } catch (error) {
    console.error('Update Holiday Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ======================== Delete Holiday ========================
const deleteHoliday = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if holiday exists
    const [holiday] = await pool.execute('SELECT * FROM tbl_holidays WHERE id = ?', [id]);
    if (holiday.length === 0) {
      return res.status(404).json({ message: 'Holiday not found' });
    }

    // Delete holiday
    await pool.execute('DELETE FROM tbl_holidays WHERE id = ?', [id]);

    res.status(200).json({ message: 'Holiday deleted successfully' });
  } catch (error) {
    console.error('Delete Holiday Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addHoliday, getAllHolidays, updateHoliday, deleteHoliday };
