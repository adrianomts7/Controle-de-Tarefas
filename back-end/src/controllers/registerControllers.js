const Register = require('../models/RegisterModel')

exports.index = (req, res) => {
    res.render('register')
}

exports.register = async (req, res) => {
    try{
        const usuario = new Register(req.body)
        await usuario.register()

        if(usuario.erros.length > 0){
            req.flash('erros', usuario.erros)
            req.session.save(() => {
                return res.redirect('register')
            })
            return
        }

        req.flash('success', 'Usuario Registrado com sucesso!')
        req.session.save(() => {
            return res.redirect('/login')
        })
    }
    catch(e){
        console.log(e)
        return res.render('404')
    }
}   
