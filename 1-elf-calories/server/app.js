const app = require('express')();
const cors = require('cors');
const fs = require('fs');

app.use(cors());

app.get('/calories', (req, res) => {
    fs.readFile('./input.txt', 'utf8', (err, data) => {
        if (err) {
            console.log('error: ', err);
            return res.send('Error getting data.');
        }
        return res.send(data);
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});