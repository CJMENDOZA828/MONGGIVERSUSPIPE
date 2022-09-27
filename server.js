const express = require('express');

const app = express();

const tempRoutes = require('./routes/api/temperature.js');
const auth = require('./routes/api/auth.js');

app.get('/', (req, res) => res.send('API Running, No Error'));
app.use(express.json({extend: false}));

app.use('/temperature',tempRoutes);
app.use('/auth',auth);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));