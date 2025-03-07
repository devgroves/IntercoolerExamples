const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Allow only your static server
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-IC-Request', 'X-HTTP-Method-Override'],
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/mock-api', (req, res) => {
   console.log('[Server] Received Request Body:', req.body);
  const { input } = req.body;
  console.log('[Server] Received Request:', input);

  if (input === 'success') {
    return res.status(200).send('<div style="color: green; font-weight: bold;">Success! Data was processed correctly.</div>');
  } else if (input === 'failure') {
    return res.status(400).send('<div style="color: red; font-weight: bold;">Failure! Invalid input provided.</div>');
  } else {
    return res.status(500).send('<div style="color: red; font-weight: bold;">Error! Something went wrong on the server.</div>');
  }
});

// Start Server
app.listen(port, () => {
    console.log(`✅ Server running at http://127.0.0.1:${port}`);
});
