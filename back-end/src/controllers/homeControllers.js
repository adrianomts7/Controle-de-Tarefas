const Tarefa = require('../models/TerefaModel')

exports.index = async (req, res) => {
    const tarefas = await Tarefa.buscaPorTarefas()
    res.render('index', {tarefas})
}
