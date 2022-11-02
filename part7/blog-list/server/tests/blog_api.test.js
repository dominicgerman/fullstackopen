const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

// beforeEach(async () => {
//   await Blog.deleteMany({})

//   let blogObject = new Blog(helper.initialBlogs[0])
//   await blogObject.save()

//   blogObject = new Blog(helper.initialBlogs[1])
//   await blogObject.save()
// })
beforeAll(async () => {
  await User.deleteMany({})
  const user = helper.initialUsers[0]
  await api
    .post('/api/users')
    .send(user)
    .set('Accept', 'application/json')
    .expect(201)
}, 10000)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}, 20000)

describe('when there are initially some notes saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 15000)

  test('identifier property is named id, (not _id)', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs[0].id).toBeDefined()
  }, 15000)
})

describe('when adding a blog', () => {
  test('a valid blog can be added ', async () => {
    const testUser = {
      username: 'test',
      password: 'test',
    }
    const authenticatedUser = await api
      .post('/api/login')
      .send(testUser)
      .set('Accept', 'application/json')

    const token = authenticatedUser.body.token

    const newBlog = {
      title: 'a new blog',
      author: 'some dude',
      url: 'example.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  }, 15000)

  test('if likes property missing, default value will be 0', async () => {
    const response = await helper.blogsInDb()

    const obj1 = response[0].likes
    const obj2 = response[1].likes

    expect(obj1).toBe(14)
    expect(obj2).toBe(0)
  })

  test('if title or url properties missing from request data, backend responds with status code 400', async () => {
    const testUser = {
      username: 'test',
      password: 'test',
    }
    const authenticatedUser = await api
      .post('/api/login')
      .send(testUser)
      .set('Accept', 'application/json')

    const token = authenticatedUser.body.token

    const newBlog = {
      author: 'yo mama',
      likes: 41,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(newBlog)
      .expect(400)
    // console.log(response.status)
    // expect(response.status).toContain(400)
  }, 10000)

  test('if no token, backend responds with status code 401', async () => {
    const newBlog = {
      author: 'yo mama',
      likes: 41,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', ``)
      .set('Accept', 'application/json')
      .send(newBlog)
      .expect(401)
    // console.log(response.status)
    // expect(response.status).toContain(400)
  }, 10000)
})

describe('when deleting/updating an exisitng blog', () => {
  test('deleting succeeds with status code 204 if id is valid', async () => {
    const testUser = {
      username: 'test',
      password: 'test',
    }
    const authenticatedUser = await api
      .post('/api/login')
      .send(testUser)
      .set('Accept', 'application/json')

    const token = authenticatedUser.body.token

    const newBlog = {
      title: 'a new blog',
      author: 'some dude',
      url: 'example.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(newBlog)
      .expect(201)

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1]
    console.log(blogToDelete)
    console.log(token)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map((r) => r.titles)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('updating number of likes succeeds', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        title: blogToUpdate.title,
        author: 'petey',
        url: blogToUpdate.url,
        likes: 99,
      })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedLikes = blogsAtEnd[0].likes

    expect(updatedLikes).toBe(99)
  })
})

describe('when creating a new user', () => {
  test('users with invalid username are not created', async () => {
    const usersAtStart = await helper.usersInDb()
    const invalidUser = {
      name: 'test',
      password: 'hithere',
    }

    await api.post(`/api/users`).send(invalidUser).expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('users with invalid password are not created', async () => {
    const usersAtStart = await helper.usersInDb()
    const invalidUser = {
      username: 'test',
      name: 'bigjames',
      password: 'w',
    }

    await api.post(`/api/users`).send(invalidUser).expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
