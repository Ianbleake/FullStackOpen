const Blog = ({ blog }) => (
  <div className="blog" >
    <h2 className="btitle" >{blog.title}</h2>
    <span className="author">{blog.author}</span>
  </div>  
)
export default Blog