var express = require("express")
var bodyParser = require("body-parser")
var log = console.log.bind(console)
var route = require("./utils/routeUtil")

var app = express()
app.use(express.static("static"))
app.use(bodyParser.json())

var indexRoutes = require("./route/index").routes
route.registerRoutes(indexRoutes, app)
var questionRoutes = require("./route/question").routes
route.registerRoutes(questionRoutes, app)
var answerRoutes = require("./route/answer").routes
route.registerRoutes(answerRoutes, app)

var server = app.listen(2002, () => {
    var instance = server.address()
    var address = instance.address
    var port = instance.port
    log(`本地服务器启动: http://${address}:${port}`)
})
