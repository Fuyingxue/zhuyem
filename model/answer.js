var fileSystem = require("fs")
var log = console.log.bind(console)
var answerFilePath = "db/answer.json"

class Answer {
    constructor(model) {
        this.author = model.author || ""
        this.content = model.content || ""
        this.questionId = Number(model.questionId) || 0
        this.createTime = Math.floor(new Date() / 1000)
    }
}

var loadData = () => {
    var data = fileSystem.readFileSync(answerFilePath, "utf8")
    data = JSON.parse(data)
    return data
}

var answer = {
    data: loadData()
}

answer.all = function () {
    return this.data
}

answer.new = function (model) {
    var item = new Answer(model)
    console.log("item", item)
    var data = this.data
    var lastItem = data[data.length - 1]
    if (lastItem == undefined) {
        item.id = 1
    } else {
        item.id = lastItem.id + 1
    }
    data.push(item)
    this.save()
    return item
}

answer.save = function () {
    var data = JSON.stringify(this.data, null, 2)
    fileSystem.writeFile(answerFilePath, data, (error) => {
        if (error == null) {
            log.log("保存成功")
            return
        }
        log.log("保存失败", error)
    })
}

module.exports = answer
