const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/animation', (req, res) => {
    console.log('API Request received', req.query);
    const elementId = req.query['ic-element-id'];
    // const animations = ['bounce', 'shake', 'fade', 'zoom'];
    console.log("random animation choosen", elementId);
    if (elementId === "bounceBtn") 
      res.status(200).send("Bounce Off");
    else if (elementId === "shakeBtn")
      res.status(200).send("I am shaking!");
     else if (elementId === "zoomBtn")
      res.status(200).send("I am zooming!");
     else if (elementId === "flipBtn")
      res.status(200).send("Flip Animation Triggered!");
     else if (elementId === "spinBtn")
        res.status(200).send("Spinning Around!");
    else if (elementId === "fadeBtn")
        res.status(200).send("Fading In and Out!");
    else
      res.status(400).send("Unknown animation ID");
});
app.listen(3000, () => {
    console.log('Server running on http://127.0.0.1:3000');
});
