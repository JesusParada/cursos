const mongoose = require('mongoose');

const URI = 'mongodb://localhost/glendyBD';

mongoose.connect(URI,{
    useNewUrlParser: true
})
    .then(db => console.log(URI, "esta conectado"))
    .catch(err => console.log(URI,"no se contectó"));

module.exports = mongoose;