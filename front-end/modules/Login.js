import validator from 'validator'

export default class Login{
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

    init(){
        this.events()
    }

    events(){
        if(!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e){
        const el = e.target
        const emailInput = el.querySelector('input[name="email"]')
        const passwordInput = el.querySelector('input[name="password"]')
        let erros = []
        let msg = document.querySelector('.messages')

        if(!validator.isEmail(emailInput.value)){
            erros.push('E-mail Invalido')
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 15){
            erros.push('Senha deve conter entre 3 a 15 caracteres')
        }

        if(erros.length > 0){
            msg.innerHTML = erros.join('<br>')
            msg.style.color = 'red'
            console.log(erros)
        }
        else{
            el.submit()
        }

    }

}
