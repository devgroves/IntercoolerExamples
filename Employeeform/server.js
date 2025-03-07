const express = require("express");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - Body:`, req.body);
  next();
});

app.post("/submit-employee", (req, res) => {
  const { name, email, mobile, qualification, experience } = req.body;
  
  // Validate required fields
  if (!name || !email || !mobile || !qualification || experience === undefined) {
    return res.status(400).send("All fields are required!");
  }
 console.log("Received Data:", req.body);
  res.send(`Employee ${name} added successfully!`);
});

// Handle live server time
app.get("/server-time", (req, res) => {
  res.send(new Date().toLocaleTimeString());
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
