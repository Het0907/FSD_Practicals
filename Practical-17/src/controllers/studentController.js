const Student = require('../models/Student');

// @desc    Get all students
// @route   GET /api/students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: error.message
    });
  }
};

// @desc    Create new student
// @route   POST /api/students
exports.createStudent = async (req, res) => {
  try {
    // Additional validation: Check if feesPaid exceeds feesTotal
    if (req.body.feesPaid && req.body.feesTotal && req.body.feesPaid > req.body.feesTotal) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: ['Fees paid cannot be more than total fees']
      });
    }

    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
        error: 'Duplicate email'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating student',
      error: error.message
    });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
exports.updateStudent = async (req, res) => {
  try {
    // Additional validation: Check if feesPaid exceeds feesTotal
    if (req.body.feesPaid && req.body.feesTotal && req.body.feesPaid > req.body.feesTotal) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: ['Fees paid cannot be more than total fees']
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating student',
      error: error.message
    });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: error.message
    });
  }
};