// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const path = require('path');
const commentsPath = path.join(__dirname, 'data/comments.json');
const comments = JSON.parse(fs.readFileSync(commentsPath));

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    if (!req.body.name || !req.body.comment) {
        return res.status(400).json({ 
            msg: 'Please include a name and comment' 
        });
    }

    const newComment = {
        name: req.body.name,
        comment: req.body.comment
    };

    comments.push(newComment);
    fs.writeFileSync(commentsPath, JSON.stringify(comments));
    res.json(comments);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});