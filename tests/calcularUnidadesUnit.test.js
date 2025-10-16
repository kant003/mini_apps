import {describe, expect, it} from "vitest";
import { toMilimiters,toDestiny,verifyData } from "../src/apps/calcularUnidades/helpers";

describe('testing unit converter',()=>{
    it('debe devolver true si le paso un numero', ()=>{
        const resultado = verifyData('10')
        expect(resultado).toBe(true)
    })

    it('debe devolver false si le paso null', () => {
        const resultado = verifyData(null)
        expect(resultado).toBe(false)
    })
    
    it('debe devolver false si le paso un valor no numero', () =>{
        const resultado = verifyData('a')
        expect(resultado).toBe(false)
    })

    it('debe devolver 10 milimetros si le paso 1 centimetro', () =>{
        const resultado = toMilimiters(1,'originCm')
        expect(resultado).toBe(10)
    })
    it('debe devolver 1 centimetro si le paso 10 milimetros', ()=>{
        const resultado = toDestiny(10, 'destinyCm')
        expect(resultado).toBe(1)
    })
})