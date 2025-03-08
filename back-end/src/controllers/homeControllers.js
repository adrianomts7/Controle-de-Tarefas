const Tarefa = require('../models/TerefaModel')

exports.index = async (req, res) => {
    const tarefas = await Tarefa.buscaPorTarefas()
    res.render('index', {tarefas})
}

exports.buscarCategoria = async (req, res) => {
    if(!req.query.categoria) return res.render('404')

    const tarefas = await Tarefa.buscarCategoria(req.query.categoria)
    if(!tarefas) return res.render('404')

    res.render('index', { tarefas })
}

exports.buscarStatus = async (req, res) => {
    if(!req.query.status) res.render('404')

    const tarefas = await Tarefa.buscarStatus(req.query.status)
    if(!tarefas) return res.render('404')

    res.render('index', {tarefas})
}