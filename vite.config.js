/// <reference types="vitest" />
import { defineConfig } from 'vite';


export default defineConfig({
 test: {
   environment: 'jsdom', // Necesario para usar el DOM
   globals: true,        // Permite usar `it`, `describe`, `expect` sin importar Vitest
   setupFiles: './setupTests.js', // opcional
 },
});
