const Tarefa = require('../models/TerefaModel')

exports.index = (req, res) => {
    res.render('tarefa')
}

exports.register = async (req, res) => {
    try{
        const tarefa = new Tarefa(req.body)
        await tarefa.register()

        if(tarefa.erros.length > 0){
            req.flash('erros', tarefa.erros)
            req.session.save(() => {
                return res.redirect('/tarefa')
            })
            return
        }

        req.flash('success', 'Tarefa Registrada com Sucesso')   
        req.session.save(() => {
            return res.redirect('/')
        })

    }
    catch(e){
        console.log(e)
        return res.render('404')
    }
}

exports.editIndex = async (req, res) => {
    if(!req.params.id) return

    const tarefa = await Tarefa.buscarPorId(req.params.id)
    if(!tarefa) return res.render('404')

    res.render('tarefa', { tarefa })
}

exports.edit = async (req,res) => {
    try{
        if(!req.params.id) return

        const tarefa = new Tarefa(req.body)
        await tarefa.edit(req.params.id)

        if(tarefa.erros.length > 0){
            req.flash('erros', tarefa.erros)
            req.session.save(() => {
                return res.redirect('/tarefa/edit/:id')
            })
            return
        }

        req.flash('success', 'Tarefa Editada com Sucesso!')
        req.session.save(() => {
            return res.redirect('back')
        })

    }
    catch(e){
        console.log(e)
        return res.render('404')
    }
}

exports.delete = async (req, res) => {
    if(!req.params.id) return

    const tarefa = Tarefa.delete(req.params.id)
    if(!tarefa) return res.render('404')

    req.flash('success', 'Tarefa Apagada com Sucesso!')
    req.session.save(() => {
        return res.redirect('/')
    })
}

exports.dados = async (req, res) => {
    if(!req.params.id) return

    const tarefa = await Tarefa.buscarPorId(req.params.id)
    if(!tarefa) return res.render('404')
    
    res.render('dadosTarefa', {tarefa})
}