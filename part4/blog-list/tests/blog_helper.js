const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'How to fuck',
    author: 'big dom',
    url: 'www.example.com',
    likes: 14,
  },
  {
    title: 'Browser can execute JS',
    author: 'some guy',
    url: 'www.example.com',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
