var questionModel = require("../model/question")
var route = require("../utils/routeUtil")

var all = {
    path: "/api/question/all",
    method: "get",
    func: (request, response) => {
        var data = questionModel.all()
        route.sendJSONToBrowser(data, response)
    }
}

var add = {
    path: "/api/question/add",
    method: "post",
    func: (request, response) => {
        var data = request.body
        var model = questionModel.new(data)
        route.sendJSONToBrowser(model, response)
    }
}

var deleteQuestion = {
    path: "/api/question/delete/:id",
    method: "get",
    func: (request, response) => {
        var id = Number(request.params.id)
        var result = questionModel.delete(id)
        var data = {
            result,
        }
        route.sendJSONToBrowser(data, response)
    }
}

var detail = {
    path: "/api/question/:id",
    method: "get",
    func: (request, response) => {
        var id = Number(request.params.id)
        var data = questionModel.get(id)
        route.sendJSONToBrowser(data, response)
    }
}

var routes = [
    all,
    add,
    deleteQuestion,
    detail,
]

module.exports.routes = routes
