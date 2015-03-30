var fs = require('fs');

module.exports = {

    getChatPage: function(request, response, next) {
        fs.readFile('./templates/chat.html', 'utf-8', function(err, html) {
            response.send(html);
        });
    }

};