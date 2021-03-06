const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/keys');
const PORT = process.env.PORT || 8080;
const User = require('./models/user');

app.use(express.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).catch(err => console.log(err));

mongoose.connection.on("connected", () => {
    console.log("connected to database!!!");
});

app.use(require('./routes/auth'));
app.use(require('./routes/user'));

if(process.env.NODE_ENV == "production") {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
}


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});


