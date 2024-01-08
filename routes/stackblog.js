const express = require('express')
const router = express.Router()
const StackBlog = require('../models/stackblog')

// Getting all
router.get('/', async (req, res) => {
  try {
    const stackBlog = await StackBlog.find()
    res.json(stackBlog)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getstackBlog, (req, res) => {
  // console.log(res);
  res.json(res.blog)
})

// Creating one
router.post('/', async (req, res) => {
  const stackBlog = new StackBlog({
    title: req.body.title,
    comment: req.body.comment,
    date: req.body.date
  })
  try {
    const newStackBlog = await stackBlog.save()
    res.status(201).json(newStackBlog)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getstackBlog, async (req, res) => {
  if (req.body.title != null) {
    res.blog.title = req.body.title
  }
  if (req.body.comment != null) {
    res.blog.comment = req.body.comment
  }
  if (req.body.date != null) {
    res.blog.date = req.body.date
  }
  try {
    const updatedStackBlog = await res.blog.save()
    res.json(updatedStackBlog)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getstackBlog, async (req, res) => {
  try {
    await StackBlog.findByIdAndDelete(req.params.id)
    res.json({ message: 'Blog deleted Successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getstackBlog(req, res, next) {
  let blog
  try {
    blog = await StackBlog.findById(req.params.id)
    if (blog == null) {
      return res.status(404).json({ message: 'Cannot find blog post' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.blog = blog
  next()
}

module.exports = router