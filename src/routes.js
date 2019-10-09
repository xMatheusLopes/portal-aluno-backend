const express = require('express');
const app = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.MemoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
});

const login = require('./controllers/LoginController');
const classes = require('./controllers/ClassesController');
const students = require('./controllers/StudentsController');
const teachers = require('./controllers/TeachersController');

app.post('/login', login.login);
app.get('/turmas/:teacher_id', classes.listar_turmas);
app.get('/turma/:class_id/alunos', students.listar_alunos_turmas);
app.get('/trabalhos/:student_id', students.listar_trabalhos_aluno);
app.post('/trabalhos/:work_id/atualizar_nota', teachers.atualizar_nota_trabalho_aluno);
app.post('/upload/:work_id', upload.single('work'), students.enviar_arquivo_trabalho);

module.exports = app;