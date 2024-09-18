const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'TestArticle1',
    author: 'IanBleake',
    url: 'www.blog.com',
    likes: 9
  },
  {
    title: 'TestArticle2',
    author: 'IanBleake',
    url: 'www.blog.com',
    likes: 29
  }

]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
  
}

module.exports = {
  initialBlogs, blogsInDB
}