const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const port = 3000;
const cors = require('cors');
const sql = require("mssql");
const connStr = "Server=SQL5052.site4now.net;Database=DB_A558E7_BancoSolCapital2;User Id=DB_A558E7_BancoSolCapital2_admin;Password=aspnet3110;";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//fazendo a conexão global
sql.connect(connStr)
    .then(conn => global.conn = conn)
    .catch(err => console.log(err));

app.use('/', router);

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

router.get('/clientecartaopre', (req, res) => {
    execSQLQuery('SELECT * FROM clientecartaopre', res);
})

router.post('/clientecartaopre', (req, res) => {
    const { NomeClienteCartaoPre, EmailClienteCartaoPre, CpfClienteCartaoPre, CelularClienteCartaoPre, NascimentoClienteCartaoPre } = req.body;
    execSQLQuery(`INSERT INTO clientecartaopre(NomeClienteCartaoPre, CpfClienteCartaoPre, CelularClienteCartaoPre, NascimentoClienteCartaoPre, EmailClienteCartaoPre )
     VALUES('${NomeClienteCartaoPre}','${CpfClienteCartaoPre}','${CelularClienteCartaoPre}','${NascimentoClienteCartaoPre}','${EmailClienteCartaoPre}')`, res);
})

function execSQLQuery(sqlQry, res) {
    global.conn.request()
        .query(sqlQry)
        .then(result => res.json(result.recordset))
        .catch(err => res.json("Falha, Tente novamente mais tarde! " + err));
}

app.listen(port);
console.log('API funcionando!');
