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

const mostBlogs = (blogs)=>{
  let blogCount = 0;
  let maxAuthor = ''

  blogs.map((blog) => {
    let autor = blog.author;
    let papers = blogs.filter((paper) => paper.author === autor).length;

    if(papers > blogCount){
      blogCount = papers;
      maxAuthor = autor;
    }
  })

  return { author: maxAuthor, blogs: blogCount}
}

const mostLikes = (blogs)=>{
  let likeCount = 0;
  let maxAuthor = ''

  blogs.map(blog => {
    let autor = blog.author;
    let papers = blogs.filter(paper => paper.author === autor)
    let count = 0

    papers.map(paper => {
      count = count + paper.likes;
    })

    if(count>likeCount){
      likeCount = count;
      maxAuthor = blog.author;
    }
  })

  return { author: maxAuthor, likes: likeCount }

}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}