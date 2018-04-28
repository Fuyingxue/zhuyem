var getTime = (createTime) => {
    var t = new Date(createTime * 1000)
    var time = t.toLocaleString()
    return time
}

var getQuestionTemplate = (model) => {
    var time = getTime(model.createTime)
    var answersNum = model.answers.length
    console.log("answersNum", answersNum)
    var answersString
    var answersHTML = ""
    if (answersNum > 0) {
        answersString = `查看响应(${answersNum}条)`
        answersHTML = getAnswerListTemplate(model.answers)
    } else {
        answersString = `暂无响应`
    }
    console.log("model的id", model.id)
    var html = `
            <div class="class-div-questionItem">
                <p class="class-p-author"><span>idea提出者:</span>${model.author}</p>
                <a href="/js/questionDetail/${model.id}" class="class-a-title">${model.title}</a>
                <p class="class-p-content">${model.content}</p>
                <span class="class-span-createTime">${time}</span>
                <span class="class-span-showAnswer">${answersString}</span>
                ${answersHTML}
            </div>`
    return html
}

var getAnswerListItem = (model) => {
    var time = getTime(model.createTime)
    var html = `
                    <div class="class-div-answerItem">
                        <p class="class-p-aAuthor">${model.author}</p>
                        <p class="class-p-aContent">${model.content}</p>
                        <span class="class-span-aCreateTime">${time}</span>
                    </div>`
    return html
}

var getAnswerListTemplate = (answersArray) => {
    var html = ""
    for (var i = 0; i < answersArray.length; i++) {
        var model = answersArray[i]
        var item = getAnswerListItem(model)
        html += item
    }
    var resultHTML = `
        <div class="class-div-answers">
                                <div class="class-div-answerNum">
                        <span class="class-span-answerNum">${answersArray.length} 条响应</span>
                    </div>
            ${html}
        </div>
    `
    return resultHTML
}

var getAnswerItemTemplate = (model) => {
    var time = getTime(model.createTime)
    var html = `
            <div class="class-div-answerDivItem">
            <p class="class-p-answerAuthor">${model.author} <span class="class-span-answerTime">${time}</span></p>
            <p class="class-p-answerContent">${model.content}</p>
        </div>
        `
    return html
}
