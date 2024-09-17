const dummy = (blogs) => {
  return 1 ;
}


const totalLikes = (blogs)=>{
  let count = 0;
  blogs.map((blog) => {count = count+blog.likes})
  return(count)
}

const favoriteBlog = (blogs)=>{
  let max = 0
  let favBlog = {};

  blogs.map(blog=>{
    if(Number(blog.likes) > max){
      max = blog.likes
      favBlog = blog
    }
  })

    return  favBlog;
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}