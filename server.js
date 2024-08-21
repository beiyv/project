const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const booksFilePath = path.join(__dirname, 'books.json');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/books', (req, res) => {
    if (fs.existsSync(booksFilePath)) {
        const books = JSON.parse(fs.readFileSync(booksFilePath, 'utf-8'));
        res.json(books);
    } else {
        res.json([]);
    }
});

app.post('/books', (req, res) => {
    const newBook = req.body;

    let books = [];
    if (fs.existsSync(booksFilePath)) {
        books = JSON.parse(fs.readFileSync(booksFilePath, 'utf-8'));
    }
    
    books.push(newBook);
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2), 'utf-8');

    res.status(201).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
