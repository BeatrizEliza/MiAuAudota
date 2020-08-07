const express = require('express');
const server = express();

const {pageLanding, pageAdopt, pageGiveHome, saveHome} = require('./pages')

//configurar nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
//recer os dados do reqbody
.use(express.urlencoded({extended: true}))
//xonfigurar arquivos estaticos (css, imgs.=, scripts)
.use(express.static("public"))
//rotas da aplicacao
.get("/", pageLanding) 
.get("/adopt", pageAdopt)
.post("/save-home", saveHome) 
.get("/give-home", pageGiveHome) 
.listen(5500);

