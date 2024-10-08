require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
var morgan = require('morgan');

const Person = require('./models/person')

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});


app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use(morgan(':method Endpoint: :url Status::status :res[content-length] BodyReq: :body - :response-time ms'));

const errorHandler = (error, request, response, next) => {
  console.error('Bad error:',error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError'){
    return response.status(422).json({error: error.message})
  }
  next(error)
}

//*Consultas

app.get('/', (request, response) => {
  response.send('<h1>I had put my front app here...</h1>');
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
});

app.get('/info', (request, response) => {
  const dataCount = Persons.length;
  const serverDate = new Date();
  response.send(`<h1>Phonebook has info for ${dataCount} people <br/> ${serverDate} </h1>`);
});

//*Eliminación
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
});

//*Creación
app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: 'name missing' });
  } else if (!body.number) {
    return response.status(400).json({ error: 'Number missing' });
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
});

//*Actualizacion
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  const person = {
    name,
    number
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if (!updatedPerson) {
        return response.status(404).send({ error: 'Person not found' });
      }
      response.json(updatedPerson);
    })
    .catch(error => next(error));
});


//*Midleware
app.use(errorHandler)

//*Server
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
