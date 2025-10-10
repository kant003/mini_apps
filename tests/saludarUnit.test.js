import { describe,it } from "vitest";
import {greet} from '../src/apps/saludar/helpers.js'
// Test unitario
describe('testeando saludador', ()=>{

    it('debe saludar si le paso un nombre', ()=>{
        const resultado = greet('Angel')
        expect(resultado).toBe('Hola que tal Angel')
    })

    it('Si le paso un nulo saluda con mensaje por defecto', () => {
        const resultado = greet(null)
        expect(resultado).toBe('Hola!!')
    })
    it('Si le paso un indefinido saluda con mensaje por defecto', () => {
        const resultado = greet(undefined)
        expect(resultado).toBe('Hola!!')
    })
    it('Si le paso un vacio saluda con mensaje por defecto', () => {
        const resultado = greet('')
        expect(resultado).toBe('Hola!!')
    })

})
