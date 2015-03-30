var mongoose = require('mongoose');

var FormDataSchema = mongoose.Schema({
    key: String,
    value: String
});

var FormData = mongoose.model('FormData', FormDataSchema);

module.exports = FormData;