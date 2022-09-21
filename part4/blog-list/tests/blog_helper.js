const Blog = require('../models/blog')
const User = require('../models/user')

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const initialUsers = [
  {
    username: 'test',
    password: 'test',
  },
  {
    username: 'User2',
    password: 'password2',
  },
]

const initialBlogs = [
  {
    title: 'This is a title',
    author: 'big dom',
    url: 'www.example.com',
    likes: 14,
    user: initialUsers[0]._id,
  },
  {
    title: 'Browser can execute JS',
    author: 'some guy',
    url: 'www.example.com',
    user: initialUsers[1]._id,
  },
]

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
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
