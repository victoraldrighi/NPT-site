import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sobre: resolve(__dirname, 'sobre/index.html'),
        obrigado: resolve(__dirname, 'obrigado/index.html'),
        servicosPressurizacao: resolve(__dirname, 'servicos/pressurizacao-escadas-emergencia/index.html'),
        servicosHidraulica: resolve(__dirname, 'servicos/projetos-hidraulicos/index.html'),
        servicosEletrica: resolve(__dirname, 'servicos/projetos-eletricos/index.html'),
        portfolio: resolve(__dirname, 'portfolio/index.html'),
        contato: resolve(__dirname, 'contato/index.html'),
      },
    },
  },
})
