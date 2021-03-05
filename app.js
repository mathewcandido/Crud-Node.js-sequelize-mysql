const express = require('express');
const app = express();

const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
var path = require('path');
const Post = require('./models/Post');

app.use(express.static(path.join(__dirname, 'views')));

app.engine("hbs", handlebars({ defaultLayout: "main", extname: '.hbs' }));
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//rotas 
app.get("/", function (req, res) {
    Post.findAll({ order: [["id", "DESC"]] }).then(function (posts) {
        res.render("home", { posts: posts });
        console.log(posts);
    });
});

app.get("/add", function (req, res) {
    res.render("add");
});

app.post("/add", function (req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    })
        .then(function () {
            res.redirect("/");
        })
        .catch(function (erro) {
            res.send("Erro ao inserir a postagem!" + erro);
        });
});

app.get("/delete/:id", function (req, res) {
    Post.destroy({ where: { id: req.params.id } })
        .then(function () {
            res.redirect("/");
        })
        .catch(function (erro) {
            res.send("Erro ao excluir a postagem!" + erro);
        });
});

app.get("/edit/:id", function (req, res) {
    Post.findByPk(req.params.id)
        .then((post) => {
            res.render("edit", {
                id: req.params.id,
                titulo: post.titulo,
                conteudo: post.conteudo,
            });
        })
        .catch((erro) => {
            res.send("Erro ao localizar a postagem!");
        });
});

app.post("/edition/:id", function (req, res) {
    Post.update({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    },
        {
            where: { id: req.params.id },
        }
    )
        .then(function () {
            res.redirect("/");
        })
        .catch(function (erro) {
            res.send("Erro ao atualizar a postagem!" + erro);
        });
});

app.listen(8000, function () {
    console.log("Servidor está executando na porta 8000!");
});



