const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

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

// This is for local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(5000, () => {
    console.log('Local server running on port 5000');
  });
}

// This is for Netlify Functions
module.exports.handler = serverless(app);
