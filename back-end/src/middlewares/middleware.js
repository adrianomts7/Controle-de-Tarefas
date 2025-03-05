exports.csrfMiddleware = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.middlewareGlobal = (req, res, next) => {
    res.locals.erro = req.flash('erros')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
}