const express = require('express');
const app = express();
const path = require('path');

// Serve static files like HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')));

// Set up a mock API endpoint to return animation types
app.get('/api/animation', (req, res) => {
  console.log('API Request received');
    const animations = ['bounce', 'shake', 'fade', 'zoom'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    res.json({ animation: randomAnimation });
    
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on http://127.0.0.1:3000');
});
