import { describe, it, expect } from 'vitest'
import { fireEvent } from '@testing-library/dom'
import '../src/apps/dados/main.js'

function mount() {
    document.body.innerHTML = ''
    const $webComponent = document.createElement('dados-app')
    document.body.appendChild($webComponent)
    return $webComponent.shadowRoot || $webComponent.attachShadow({ mode: 'open' })
}

describe('testeando lanzador de dados E2E', () => {
    it('muestra resultados cuando se lanza un dado', () => {
        const shadow = mount()
        const $form = shadow.querySelector('#form')
        
        fireEvent.submit($form)

        const $results = shadow.querySelector('#results')
        const $total = shadow.querySelector('#total')
        
        expect($results.textContent).toContain('🎲')
        expect($total.textContent).toContain('Total:')
    })

    it('lanza la cantidad de dados especificada', () => {
        const shadow = mount()
        const $input = shadow.querySelector('#numDice')
        $input.value = '3'

        const $form = shadow.querySelector('#form')
        fireEvent.submit($form)

        const $results = shadow.querySelector('#results')
        const diceCount = ($results.textContent.match(/🎲/g) || []).length
        
        expect(diceCount).toBe(3)
    })

    it('calcula el total correctamente', () => {
        const shadow = mount()
        const $input = shadow.querySelector('#numDice')
        $input.value = '2'

        const $form = shadow.querySelector('#form')
        fireEvent.submit($form)

        const $results = shadow.querySelector('#results')
        const $total = shadow.querySelector('#total')
        
        const resultsText = $results.textContent
        const diceValues = resultsText.match(/\d+/g)?.map(Number) || []
        const expectedTotal = diceValues.reduce((a, b) => a + b, 0)
        
        const totalText = $total.textContent
        const displayedTotal = parseInt(totalText.match(/\d+/)?.[0] || '0')
        
        expect(displayedTotal).toBe(expectedTotal)
    })

    it('muestra error con número inválido de dados menor a 1', () => {
        const shadow = mount()
        const $input = shadow.querySelector('#numDice')
        $input.value = '0'

        const $form = shadow.querySelector('#form')
        fireEvent.submit($form)

        const $results = shadow.querySelector('#results')
        expect($results.textContent).toBe('Número de dados debe estar entre 1 y 10')
    })

    it('muestra error con número inválido de dados mayor a 10', () => {
        const shadow = mount()
        const $input = shadow.querySelector('#numDice')
        $input.value = '15'

        const $form = shadow.querySelector('#form')
        fireEvent.submit($form)

        const $results = shadow.querySelector('#results')
        expect($results.textContent).toBe('Número de dados debe estar entre 1 y 10')
    })

    it('cada dado está en el rango válido 1-6', () => {
        const shadow = mount()
        const $input = shadow.querySelector('#numDice')
        $input.value = '5'

        const $form = shadow.querySelector('#form')
        
        for (let i = 0; i < 10; i++) {
            fireEvent.submit($form)
            
            const $results = shadow.querySelector('#results')
            const resultsText = $results.textContent
            const diceValues = resultsText.match(/\d+/g)?.map(Number) || []
            
            diceValues.forEach(value => {
                expect(value).toBeGreaterThanOrEqual(1)
                expect(value).toBeLessThanOrEqual(6)
            })
        }
    })

    it('genera resultados diferentes en múltiples lanzamientos', () => {
        const shadow = mount()
        const $input = shadow.querySelector('#numDice')
        $input.value = '3'

        const $form = shadow.querySelector('#form')
        const $results = shadow.querySelector('#results')
        
        const allResults = []
        
        for (let i = 0; i < 10; i++) {
            fireEvent.submit($form)
            allResults.push($results.textContent)
        }

        const uniqueResults = new Set(allResults)
        expect(uniqueResults.size).toBeGreaterThan(1)
    })
})