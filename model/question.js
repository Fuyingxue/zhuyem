var fileSystem = require("fs")
var log = console.log.bind(console)
var stringUtil = require("../utils/stringUtil")
var answerModel = require("./answer")
var questionFilePath = "db/question.json"

class Question {
    constructor(model) {
        this.title = model.title || ""
        this.author = model.author || ""
        this.content = stringUtil.maxTextLength(model.content, 160) || ""
        this.answers = [] || ""
        this.createTime = Math.floor(new Date() / 1000)
    }
}

var loadQuestions = () => {
    var content = fileSystem.readFileSync(questionFilePath, "utf8")
    content = JSON.parse(content)
    return content
}

var question = {
    data: loadQuestions(),
}

question.all = function () {
    var questionData = this.data
    var answerData = answerModel.all()
    for (var i = 0; i < questionData.length; i++) {
        var question = questionData[i]
        var answerArray = []
        for (var j = 0; j < answerData.length; j++) {
            var answer = answerData[j]
            if (answer.questionId == question.id) {
                answerArray.push(answer)
            }
        }
        question.answers = answerArray
    }
    return questionData
}

question.new = function (model) {
    var data = this.data
    var newItem = new Question(model)
    var lastItem = data[data.length - 1]
    if (lastItem == undefined) {
        newItem.id = 1
    } else {
        newItem.id = lastItem.id + 1
    }
    data.push(newItem)
    this.save()
    logUtil.log("添加成功", newItem)
    return newItem
}

question.delete = function (id) {
    var questions = question.data
    var found = false
    for (var i = 0; i < questions.length; i++) {
        var item = questions[i]
        if (item.id == id) {
            found = true
            break
        }
    }
    questions.splice(i, 1)
    console.log(question.data)
    this.save()
    return found
}

question.get = function (id) {
    var questions = this.data
    for (var i = 0; i < questions.length; i++) {
        var item = questions[i]
        if (item.id == id) {
            var answerModel = require("./answer")
            var answers = answerModel.all()
            var answerArray = []
            for (var j = 0; j < answers.length; j++) {
                var answer = answers[j]
                if (answer.id == item.id) {
                    answerArray.push(answer)
                }
            }
            item.answers = answerArray
            return item
        }
    }
}

question.save = function () {
    var data = JSON.stringify(this.data, null, 2)
    fileSystem.writeFile(questionFilePath, data, (error) => {
        if (error == null) {
            log.log("保存成功")
            return
        }
        log.log("保存出错", error)
    })
}

module.exports = question
