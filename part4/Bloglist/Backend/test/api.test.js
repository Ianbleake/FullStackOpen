const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('Testing Api Bloglist',()=>{

  beforeEach( async ()=>{
    await Blog.deleteMany({})
  
    const blogObjets = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjets.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  describe('Fetching blogs', ()=>{

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

    test('Specific blog are returned', async ()=>{

      const blogs = await helper.blogsInDB();
      const blogToFetch = blogs[0]

      const response = await api
        .get(`/api/blogs/${blogToFetch.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/) 

      assert.deepStrictEqual(response.body,blogToFetch)
    })

    test('Fail to fetching a inexistent ID', async () => { 

      const notExitistingBlog = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${notExitistingBlog}`)
        .expect(404)
    })

  });
  
  describe('Adding blogs to database', () => { 

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

    test('blog withou Title is not added', async () => {
      const newBlog = {
        author: "Ian Bleake",
        url: "www.example.com",
        likes: 12
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
      
    })

    test('blog withou URL is not added', async () => {
      const newBlog = {
        title: "test article post",
        author: "Ian Bleake",
        likes: 12
      }
    
      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    
    })

  });
  
  describe('Modify blogs from database', () => {
    
    test('Blog Deleted successful',async () => {
    
      const blogsAtStart = await helper.blogsInDB()
      const blogToDelete = blogsAtStart[0]
    
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
      const blogsAtEnd = await helper.blogsInDB()
    
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length -1)
    
      const contents = blogsAtEnd.map(r => r.title)
      assert(!contents.includes(blogToDelete.title))
    
     })

     test('Blog likes can be updated', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToUpdate = blogsAtStart[0]
    
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 10
      }
    
      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      assert.strictEqual(response.body.likes, updatedBlog.likes)
    
      const blogsAtEnd = await helper.blogsInDB()
      const blogAfterUpdate = blogsAtEnd.find(b => b.id === blogToUpdate.id)
      assert.strictEqual(blogAfterUpdate.likes, updatedBlog.likes)
    })

  });  

})

after(async ()=>{
  await mongoose.connection.close()
})