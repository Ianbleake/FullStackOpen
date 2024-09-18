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

const nonExistingId = async () => {
  const blog = new Blog({ title: "I will delete this" })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

module.exports = {
  initialBlogs, blogsInDB , nonExistingId
}