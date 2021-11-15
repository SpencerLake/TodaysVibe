const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.post('/login', (req,res) => {
    res.send({
        token: 'test123'
    });
});

app.listen(PORT, () => console.log(`API is running on ${PORT}`));