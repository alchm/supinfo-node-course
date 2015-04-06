var mongoose = require('mongoose'),
    mongooseAutoIncrement = require('mongoose-auto-increment');

var CustomerSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    CreationDate: Date,
    Website: String
});
// Mongoose Schema can have plugins
// The mongoose-auto-increment module provide you one
// See the documentation: https://github.com/codetunnel/mongoose-auto-increment#getting-started
CustomerSchema.plugin(mongooseAutoIncrement.plugin, {model: 'Customer', field: 'ID'});

var Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;