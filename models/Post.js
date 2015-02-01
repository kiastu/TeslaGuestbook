/**
 * Created by David on 2015-02-01.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
    name: String,
    content: String,
    date: String,
    signatureLink:String

});

module.exports = mongoose.model('Post', PostSchema);