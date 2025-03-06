const Login = require('../models/RegisterModel')

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado')
    res.render('login')
}

exports.login = async (req, res) => {
    try{
        const contato = new Login(req.body)
        await contato.login()

        if(contato.erros.length > 0){
            req.flash('erros', contato.erros)
            req.session.save(() => {
                return res.redirect('/login')
            })
            return
        }

        req.flash('success', 'Você entrou no sistema')
        req.session.user = contato.user
        req.session.save(() => {
            return res.redirect('/login')
        })

    }
    catch(e){
        console.log(e)
        return res.render('404')
    }
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/login')
    return
}