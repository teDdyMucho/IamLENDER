const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Mock database (in-memory storage)
const submissions = [];

// API Routes
app.post('/api/submitForm', (req, res) => {
  try {
    const formData = req.body;
    
    // Add timestamp
    formData.submittedAt = new Date();
    
    // Store in our mock database
    submissions.push(formData);
    
    // Log the submission (for demonstration purposes)
    console.log('New form submission received:');
    console.log(JSON.stringify(formData, null, 2));
    
    // Return success response
    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      submissionId: submissions.length
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your submission'
    });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
