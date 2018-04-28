var route = require("../utils/routeUtil")

var index = {
    path: "/js",
    method: "get",
    func: (request, response) => {
        var path = "indexye.html"
        route.sendHtmlToBrowser(path, response)
    }
}


var indexDetail = {
    path: "/js/index.html",
    method: "get",
    func: (request, response) => {
        var path = "index.html"
        route.sendHtmlToBrowser(path, response)
    }
}

var questionDetail = {
    path: "/js/questionDetail/:id",
    method: "get",
    func: (request, response) => {
        var questionId = request.params.id
        console.log("参数传过来的 id", request.params.id)
        var path = "questionDetail.html"
        route.sendDetailHtmlToBrowser((data) => {
            console.log("原来的 html 文件", data)
            var result = data.replace("##question_id##", questionId)
            console.log("返回的 html 文件", result)
            return result
        }, path, response)
    }
}

var answered = {
    path: "/js/answered.html",
    method: "get",
    func: (request, response) => {
        var path = "answered.html"
        route.sendHtmlToBrowser(path, response)
    }
}

var noAnswered = {
    path: "/js/noAnswered.html",
    method: "get",
    func: (request, response) => {
        var path = "noAnswered.html"
        route.sendHtmlToBrowser(path, response)
    }
}

var routes = [
    index,
    indexDetail,
    questionDetail,
    answered,
    noAnswered,
]


module.exports.routes = routes
