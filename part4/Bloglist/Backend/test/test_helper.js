const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'TestArticle1',
    author: 'IanBleake',
    url: 'www.blog.com'
  },
  {
    title: 'TestArticle2',
    author: 'IanBleake',
    url: 'www.blog.com'
  }

]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
  
}

module.exports = {
  initialBlogs, blogsInDB
}