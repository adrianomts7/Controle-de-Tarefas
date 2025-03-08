const mongoose = require('mongoose')
const validator = require('validator')

const TarefaSchema = new mongoose.Schema({
    tarefa: {type: String, required: true},
    descricao: {type: String, default: ''},
    categoria: {type: String, required: true, enum: ['Profissional', 'Pessoal']},
    status: {type: String, required: true, enum: ['Pendente','Concluido']},
    dataCriacao: {type: Date, required: true, default: Date.now},
    dataConclusao: {type: Date, required: true},
})

const TarefaModel = mongoose.model('Tarefas', TarefaSchema)

class Tarefa{
    constructor(body){
        this.body = body
        this.erros = []
        this.tarefa = null
    }

    async register(){
        this.valida()
        if(this.erros.length > 0) return

        this.tarefa = await TarefaModel.create(this.body)
    }

    valida(){
        if(this.erros.length > 0) return

        if(typeof this.body.tarefa !== 'string') this.erros.push('Tarefa Invalida!')
        if(typeof this.body.descricao !== 'string') this.erros.push('Descrição Invalida')
        if(this.body.tarefa.length < 3 || this.body.tarefa > 8) this.erros.push('Tarefa deve conter entre 3 a 8 caracteres')
    }

    async edit(id){
        if(typeof id !== 'string') return
        this.valida()
        if(this.erros.length > 0) return
        
        this.tarefa = await TarefaModel.findByIdAndUpdate(id, this.body, {new: true})
    }

    static async buscarPorId(id){
        if(typeof id !== 'string') return

        const tarefa = await TarefaModel.findById(id)
        return tarefa
    }

    static async buscaPorTarefas(){
        const tarefas = await TarefaModel.find()
            .sort({dataCriacao: -1})
        return tarefas
    }

    static async delete(id){
        if(typeof id !== 'string') return

        const tarefa = await TarefaModel.findByIdAndDelete({_id: id})
        return tarefa
    }

    static async buscarCategoria(categoria){
        if(typeof categoria !== 'string') return

        const tarefa = await TarefaModel.find({categoria})
        return tarefa
    }

    static async buscarStatus(status){
        if(typeof status !== 'string') return

        const tarefa = await TarefaModel.find({status: status})
        return tarefa

    }

}   

module.exports = Tarefa