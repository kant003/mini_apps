
class SaludoApp extends HTMLElement{
    constructor(){
        super()
        const shadow = this.attachShadow()
        this.$form = shadow.getElementById('form')
        this.$name = shadow.getElementById('name')
        this.$out = shadow.getElementById('out')
    }

    connectCallback() {
        this.$form.addEventListener('submit', this.onSubmit)
    }

    disconnectCallback() {
        this.$form.removeEventListener('submit', this.onSubmit)
    }

    onSubmit(e){
        e.preventDefault()
        this.$out.textContent = "Hola que tal"  +  this.$name
    }

}
