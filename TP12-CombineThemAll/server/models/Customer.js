var mongoose = require('mongoose');

var CustomerSchema = mongoose.Schema({
    ID: Number,
    FirstName: String,
    LastName: String,
    CreationDate: Date,
    Website: String
});

var Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;