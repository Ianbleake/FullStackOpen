const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const helper = require('./test_helper')

const User = require('../models/user')

describe('Testing users:',()=>{

  beforeEach( async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testpass123',10)
    const user = new User({ username: 'TestingUser', passwordHash })

    await user.save()
  })

  test('Creating a new User ',async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: 'BleakeTest',
      name: 'Ivan Rangel',
      password: 'Testing'
    }

    await api
      .post('/api/users')
        .send(newUser)
          .expect(201)
            .expect('Content-Type',/application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map( u => u.username )
    assert(usernames.includes(newUser.username))
  })

  test('Creation fails whith a invalid user and code 400',async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: 'Bl',
      name: 'Ivan Rangel',
      password: 'Testing'
    }

    await api
      .post('/api/users')
        .send(newUser)
          .expect(400)
            .expect('Content-Type',/application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

})

after(async () => {
  await mongoose.connection.close()
})