const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request,response)=>{
  const blogs = await Blog
    .find({}).populate('user',{username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body

  if(!body.userId){
    return response.status(400).json({ error: 'UserId is missing' })
  }
  
  if (!body.title || !body.url ) {
    return response.status(400).json({ error: 'title or url missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken){
    console.log("TokenDecoded:", decodedToken)
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(!user) {
    console.log(User.collection.name)
    return response.status(404).json({ error: 'User not found' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request,response)=>{
  const blog = await Blog.findById(request.params.id)

  if(blog){
    response.json(blog)
  }else{
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true } 
  )

  if (updatedBlog) {
    response.status(200).json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id',async (request,response)=>{
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter