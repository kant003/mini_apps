import {fireEvent} from "@testing-library/dom"
import '--/src/apps/calcularUnidades/main.js'
function mount(){
    document.body.innerHTML=''
    const $webComponent = document.createElement('unidades-app')
    document.body.appendChild($webComponent)
    return $webComponent.shadowRoot || $webComponent.attachShadow({mode:'open'})
}
describe('testeando calculadora de unidades E2E', () => {
    it('Transforma una cantidad de una unidad a otra', ()=>{
        const shadow = mount()
        const $input = shadow.querySelector('#quantity')
        $input.value = 10
        const $origin = shadow.querySelector('#originUnit')
        $origin.value = 'originMm'
        const $destiny = shadow.querySelector('#destinyUnit')
        $destiny.value = 'destinyCm'

        const $form = shadow.querySelector('#form')
        fireEvent.submit($form)

        const $out = shadow.querySelector('#out')
        expect($out.textContent).toBe('Resultado: 1 centimetros')
    })
})