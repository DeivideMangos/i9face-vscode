# Estética I9 Face & Cursos — pacote para VS Code

Este pacote contém a cópia editável do site, o catálogo e os materiais visuais utilizados. Não precisa instalar pacotes Node.js; para regenerar o HTML, use Python 3.10 ou superior.

## Abrir e visualizar

1. Extraia o arquivo ZIP.
2. Abra a pasta `i9face-vscode` no VS Code.
3. Abra um terminal dentro da pasta e inicie um servidor local:
   - Windows: `py -m http.server 3000`
   - macOS/Linux: `python3 -m http.server 3000`
4. No navegador, acesse `http://localhost:3000`.

Inicie o servidor na pasta que contém o `index.html`. O diretório `manus-storage/` inclui cópias locais dos arquivos de mídia referenciados pelo site, incluindo o retrato recortado do hero.

## Editar o site

- `index.template.html`: estrutura e textos da página. Esta é a fonte do HTML.
- `styles.css`: cores, tipografia, espaçamento e comportamento responsivo.
- `main.js`: navegação do menu e interação com as abas/categorias do catálogo.
- `catalogs.json`: procedimentos, categorias, preços, unidades e observações.
- `render_site.py`: gera o arquivo final `index.html` a partir do template e do catálogo.
- `index.html`: página gerada, pronta para visualização; alterações feitas diretamente nele podem ser substituídas na próxima geração.

Para regenerar o HTML depois de editar o template ou o catálogo, execute na pasta do projeto:

- Windows: `py render_site.py`
- macOS/Linux: `python3 render_site.py`

## Arquivos e materiais incluídos

- `public/assets/` e `public/favicon.png`: recursos visuais do projeto, incluindo uma cópia local do retrato recortado.
- `manus-storage/`: espelhos locais dos arquivos referenciados pelo HTML, para que imagens e logo também funcionem no servidor local.
- `source-materials/`: materiais originais disponíveis, incluindo logo, anúncio de preenchimento labial, imagens dos catálogos, a arte original `IMG_1952.jpeg` e a primeira foto da limpeza fotônica.
- `TODO.md`: checklist do projeto e itens que ainda dependem de fotos ou informações da cliente.
- `reference-notes.md`: referências visuais e notas de identidade.
- `app.config.ts` e `manus-routes.json`: metadados do projeto Manus; não são necessários para servir o site localmente.

A imagem principal usa um recorte da arte `IMG_1952.jpeg`, preservando o retrato e removendo textos e elementos gráficos. O original permanece em `source-materials/`. A galeria de limpeza fotônica tem quatro cartões equivalentes, em grade 2×2 no celular. A foto 01 aparece inteira, sem cortes nem filtro de cor, e os cartões 02–04 continuam livres para as próximas imagens.

Dados profissionais, endereço completo, horários e detalhes de cursos que ainda não foram fornecidos não foram inventados.

## Observação sobre versionamento

O ZIP não contém a pasta `.git` nem o endereço remoto interno do projeto Manus. Ele inclui os arquivos necessários para abrir, editar e executar o site no VS Code, sem credenciais ou configuração de acesso privado.
