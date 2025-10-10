import { fireEvent } from "@testing-library/dom"
import '../src/apps/saludar/main.js'
function mount(){
    document.body.innerHTML = ''
    const $webComponent  = document.createElement('saludar-app')
    document.body.appendChild($webComponent)
    return $webComponent.shadowRoot ||  $webComponent.attachShadow({mode:'open'})
}
describe('testeando saludador E2E', ()=>{
    it('Muestra un saludo cuando se envia el formulario', ()=>{

        const shadow = mount()
        const $input = shadow.querySelector('#name')
        $input.value = 'Juan'


        const $form = shadow.querySelector('#form')
        fireEvent.submit($form)

        const $out = shadow.querySelector('#out')
        expect($out.textContent).toBe('Hola que tal Juan')
    })

})
