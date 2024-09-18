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

test('Blog added succesful',async ()=>{
  const newBlog = {
    title: "test article post",
    author: "Ian Bleake",
    url: "www.ian.blog",
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  assert(contents.includes('test article post'))

})

test('Blog without likes defaults to 0', async () => {
  const newBlog = {
    title: "Blog without likes",
    author: "Anonymous",
    url: "www.example.com"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const savedBlog = response.body
  assert.strictEqual(savedBlog.likes, 0) 

  const blogsAtEnd = await helper.blogsInDB()
  const blogInDB = blogsAtEnd.find(blog => blog.title === newBlog.title)
  assert.strictEqual(blogInDB.likes, 0)
})




after(async ()=>{
  await mongoose.connection.close()
})