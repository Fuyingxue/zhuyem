var answerModel = require("../model/answer")
var route = require("../utils/routeUtil")

var all = {
    path: "/api/answer/all",
    method: "get",
    func: (request, response) => {
        var data = answerModel.all()
        route.sendJSONToBrowser(data, response)
    }
}

var add = {
    path: "/api/answer/add",
    method: "post",
    func: (request, response) => {
        console.log("路由收到的数据", request.body)
        var data = request.body
        var model = answerModel.new(data)
        route.sendJSONToBrowser(model, response)
    }
}

var routes = [
    all,
    add,
]

module.exports.routes = routes
