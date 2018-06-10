var express = require('express')
var app = express();

app.use(express.static(__dirname+"/dist"));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});
app.listen(4200);
// app.use(function (req, res, next) {

//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     // Pass to next layer of middleware
//     next();
// });