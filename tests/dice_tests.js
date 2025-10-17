import { describe, it, expect } from 'vitest'
import { rollDice } from '../src/apps/dados/helpers.js'

// Test unitario
describe('testeando lanzador de dados', () => {
    it('debe lanzar 1 dado por defecto', () => {
        const result = rollDice()
        expect(result.results).toHaveLength(1)
        expect(result.results[0]).toBeGreaterThanOrEqual(1)
        expect(result.results[0]).toBeLessThanOrEqual(6)
        expect(result.total).toBe(result.results[0])
    })

    it('debe lanzar el número especificado de dados', () => {
        const result = rollDice(3)
        expect(result.results).toHaveLength(3)
        expect(result.total).toBe(result.results.reduce((a, b) => a + b, 0))
    })

    it('cada dado debe estar entre 1 y 6', () => {
        const result = rollDice(5)
        result.results.forEach(roll => {
            expect(roll).toBeGreaterThanOrEqual(1)
            expect(roll).toBeLessThanOrEqual(6)
        })
    })

    it('debe calcular el total correctamente', () => {
        const result = rollDice(4)
        const expectedTotal = result.results.reduce((sum, val) => sum + val, 0)
        expect(result.total).toBe(expectedTotal)
    })

    it('debe retornar error si el número de dados es menor a 1', () => {
        const result = rollDice(0)
        expect(result.error).toBeDefined()
        expect(result.error).toBe('Número de dados debe estar entre 1 y 10')
    })

    it('debe retornar error si el número de dados es mayor a 10', () => {
        const result = rollDice(11)
        expect(result.error).toBeDefined()
        expect(result.error).toBe('Número de dados debe estar entre 1 y 10')
    })

    it('debe retornar error con números negativos', () => {
        const result = rollDice(-5)
        expect(result.error).toBeDefined()
    })

    it('debe generar resultados aleatorios diferentes', () => {
        const results = []
        for (let i = 0; i < 10; i++) {
            results.push(rollDice(3).results.join(','))
        }
        const uniqueResults = new Set(results)
        expect(uniqueResults.size).toBeGreaterThan(1)
    })

    it('debe manejar correctamente el valor por defecto', () => {
        const result1 = rollDice()
        const result2 = rollDice(1)
        expect(result1.results).toHaveLength(1)
        expect(result2.results).toHaveLength(1)
    })
})