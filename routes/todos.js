const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()

router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean()

    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
    })
})

router.get('/', (req, res) => {
    res.render('index', {
        title: "Главная страница",
        isIndex: true
    })
})


router.get('/create', (req, res) => {
    res.render('create', {
        title: "Добавить дело",
        isCreate: true
    })
})

router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })

    console.log(todo)

    await todo.save()
    res.redirect('/')
})

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)

    todo.completed = !!req.body.completed
    await todo.save()

    res.redirect('/')
})

module.exports = router;