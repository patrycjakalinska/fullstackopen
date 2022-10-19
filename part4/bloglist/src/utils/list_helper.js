const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach((blog) => (sum += blog.likes))
  return sum
}

const dummy = (blogs) => {
  return 1
}

const favouriteBlog = (blogs) => {
  return maximum(blogs, (blog) => blog.likes)
}

const mostBlogs = (blogs) => {
  const authors = unqiue(blogs.map((b) => b.author))
  const blogFromAuthor = authors.map((a) => ({
    author: a,
    blogs: blogs.filter((b) => b.author === a).length,
  }))

  return maximum(blogFromAuthor, (x) => x.blogs)
}

const mostLikes = (blogs) => {
  const authors = unqiue(blogs.map((b) => b.author))
  const authorLikes = authors.map((a) => ({
    author: a,
    likes: blogs
      .filter((b) => b.author === a)
      .reduce((sum, blog) => sum + blog.likes, 0),
  }))
  console.log(authorLikes)

  return maximum(authorLikes, (x) => x.likes)
}

const unqiue = (x) => Array.from(new Set(x))

const maximum = (x, f) => {
  if (x.length === 0) {
    return 0
  }
  return x.reduce((x, y) => (f(x) > f(y) ? x : y))
}

module.exports = {
  totalLikes,
  dummy,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
