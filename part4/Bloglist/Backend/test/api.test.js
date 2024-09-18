const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach( async ()=>{
  await Blog.deleteMany({})

  const blogObjets = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjets.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as JSON',async ()=>{
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('All blogs are returned', async ()=>{
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('The blogs ID have the correct format', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    assert.strictEqual(typeof blog.id, 'string')  
    assert.ok(blog.id) 
  })
})



after(async ()=>{
  await mongoose.connection.close()
})