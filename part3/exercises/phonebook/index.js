const express = require('express')
const app = express()
app.use(express.json());

let Persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/',(request,response)=>{
  response.send('<h1>Hello persons!</h1>')
})

app.get('/api/persons',(request,response)=>{
  response.json(Persons)
})

app.get('/api/persons/:id',(request,response)=>{
  const id = Number(request.params.id);
  const person = Persons.find(person => person.id === id);
  if(person){
    response.json(person);
  }else{
    response.status(404).end();
  }
})

app.get('/info',(request,response)=>{
  const dataCount = Persons.length;
  console.log('Count:',dataCount)
  const serverDate = new Date();
  console.log("Fecha:", serverDate);
  response.send(`<h1>Phonebook has info for ${dataCount} people <br/> ${serverDate} </h1>`);
})


const PORT = 3001;
app.listen(PORT,()=>{console.log(`Server running on port: ${PORT}`)});