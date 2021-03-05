const db = require('./db');

const Post = db.sequelize.define("post", {
    titulo: {
        type: db.Sequelize.STRING,
        allowNull: false
    },

    conteudo: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
})

module.exports = Post;

//Atualizar a estrutura da tabela
Post.sync({ alter: true });

//Recriar toda a estrutura da tabela (excluir e criar a tabela)
//Post.sync({ force: true});

//Somente cria a estrutura da tabela, caso a tabela não exista
//Post.sync();