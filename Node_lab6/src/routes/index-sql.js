const router = require('express').Router()
const db = require('../services/dbsqlite')

router.use((req, res, next) => {
    if(req.query._method === 'DELETE'){
        console.log('delete?', req.method);
        req.method = 'DELETE'
        // /delete/12
        req.url = req.path
    }

    next()
})

router.get('/',  (req, res) => {
    const sql = "SELECT * FROM Todos ORDER BY Title"
    db.all(sql, [], (err, rows) => {
        if(err) return console.error(err.message)

        res.render('index', { model:rows })
    })
})

router.get('/create', (req, res) => {
    res.render('create', { model: {} })
})
router.post('/create', (req, res) => {
    const sql = "INSERT INTO Todos (Title) VALUES (?)"
    const todo = [req.body.Title]

    db.run(sql, todo, (err) => {
        if(err) return console.error(err.message)

        res.redirect('/')
    })
})

router.delete('/delete/:id', (req,res) => {
    const id = req.params.id
    const sql = "DELETE FROM Todos WHERE ID = ?"
    db.run(sql, id, (err) => {
        if(err) return console.error(err.message)
        res.redirect('/')
    })
})

module.exports = router