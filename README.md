# Soluct Sistemas - Teste prático

Teste prático da Soluct Sistemas para a vaga de Desenvolvedor Vue.

O projeto foi feito com base no desafio da [Coodesh](https://github.com/coodesh/frontend-radio-browser).

A ideia do projeto foi de construir uma visualização de rádios, marcando as preferidas pelo usuário e, reproduzir a rádio, caso o usuário deseje.

## Stack utilizada

**Front-end:** Vue3, Bootstrap

## Rodando localmente

Clone o projeto através do comando:

```bash
  git clone https://github.com/edersato/soluct_test.git
```
Entre no diretório do projeto

```bash
  cd soluct_test
```

E faça a instalação através do comando:

```bash
  npm i
  ou
  npm install
```

## Inicialização

Para iniciar o projeto em modo de desenvolvimento, insira o comando:

```bash
  npm run dev
```

**IMPORTANTE**: Abra um terminal separado e rode o comando abaixo, para as funções relativas ao CRUD das rádios, conforme desafio proposto: 

```bash
  json-server --watch db.json --port 3001
```
## Funcionalidades

- Busca por nome da rádio, país ou idioma
- Live reloading para busca de rádio
- Responsividade para todos os tamanhos de tela
