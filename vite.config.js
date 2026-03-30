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
        blog: resolve(__dirname, 'blog/index.html'),
        blogPressurizacao: resolve(__dirname, 'blog/pressurizacao-escadas-emergencia-guia-completo/index.html'),
        blogNbr9077: resolve(__dirname, 'blog/nbr-9077-requisitos-saidas-emergencia/index.html'),
        blogIt11: resolve(__dirname, 'blog/it-11-corpo-bombeiros-requisitos/index.html'),
        blogHidraulico: resolve(__dirname, 'blog/projeto-hidraulico-predial-guia-completo/index.html'),
        blogEletrico: resolve(__dirname, 'blog/projeto-eletrico-predial-guia-completo/index.html'),
        blogAvcb: resolve(__dirname, 'blog/avcb-auto-vistoria-corpo-bombeiros/index.html'),
        blogClcb: resolve(__dirname, 'blog/clcb-certificado-licenciamento/index.html'),
        blogDiferencaAvcbClcb: resolve(__dirname, 'blog/diferenca-avcb-clcb/index.html'),
        blogComoFunciona: resolve(__dirname, 'blog/sistema-pressurizacao-escadas-como-funciona/index.html'),
        blogNormasAbnt: resolve(__dirname, 'blog/normas-abnt-construcao-civil/index.html'),
        blogIncendio: resolve(__dirname, 'blog/projeto-incendio-predial/index.html'),
        blogCustoHidraulico: resolve(__dirname, 'blog/quanto-custa-projeto-hidraulico/index.html'),
      },
    },
  },
})
