const dummy = (blogs) => {
  return 1 ;
}


const totalLikes = (blogs)=>{
  let count = 0;
  blogs.map((blog) => {count = count+blog.likes})
  return(count)
}

module.exports = {
  dummy, totalLikes
}