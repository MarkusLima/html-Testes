var express = require('express');
var app = express();
var server = require('http').createServer(app).listen(3001);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

var emitir = function (req, res, next) {
    var notificar = req.query.notificacao || '';
    if (notificar != '') {
        io.emit('notificacao', notificar);
        next();
    } else {
        next();
    }
}

app.use(emitir);

app.use('/api', router);

router.route('/notificar')
    .get(function (req, res) {
        res.json({ message: "ok" })
    })

var port = process.env.PORT || 3000;
app.listen(port);
console.log('conectado a porta ' + port);