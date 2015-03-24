var express = require('express');
var app = express();
var router = express.Router();
var Controller = require('./controller');

app.use(router);

router.route('*')
    .all(Controller.allInit);

router.route('/auth/*')
    .all(Controller.allAuth);

router.route(['/','/index'])
    .get(Controller.getIndex);

router.route('/form')
    .get(Controller.getForm)
    .post(Controller.postForm);

app.listen(1337);