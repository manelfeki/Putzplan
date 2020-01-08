const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log("hello");
    res.end("hello world");
})

app.listen(8000, () => console.log("server listens"));