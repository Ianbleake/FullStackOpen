const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

const url = process.env.MONGODB_URI;

console.log('Conecting to',url);

mongoose.connect(url)
  .then(result => {
    console.log('Connected to BleakeServer');
  })
  .catch(error => {
    console.log('Error conecting to MongoDB: ',error.message);
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: Number
})

personSchema.set('toJSON',{
  transform: (document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person',personSchema)