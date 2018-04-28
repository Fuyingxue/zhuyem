var initQuestionInfo = (response) => {
    var titleSelector = e(".class-h2-questionTitle")
    var contentSelector = e(".class-p-questionContent")
    titleSelector.innerHTML = response.title
    contentSelector.innerHTML = response.content
    log("response", response)
    var answers = response.answers
    for (var i = 0; i < answers.length; i++) {
        var item = answers[i]
        insertAnswerDiv(item)
    }
}

var getQuestionData = () => {
    var questionId = document.body.dataset.id
    var request = {
        url: `/api/question/${questionId}`,
        method: "GET",
        callback: (response) => {
            initQuestionInfo(response)
        }
    }
    ajax(request)
}

var getAnswerModel = () => {
    var authorSelector = e(".class-input-answerAuthor")
    var contentSelector = e(".class-textArea-answerContent")
    var model = {
        author: authorSelector.value,
        content: contentSelector.value,
        questionId: document.body.dataset.id,
    }
    return model
}

var insertAnswerDiv = (response) => {
    var html = getAnswerItemTemplate(response)
    var answerList = e(".class-div-answersList")
    answerList.insertAdjacentHTML("beforeend", html)
}

var bindAddAnswerEvent = () => {
    var addButton = e("#id-button-addNewComment")
    var request = {
        url: "/api/answer/add",
        method: "POST",
        contentType: "application/json",
        callback: (response) => {
            insertAnswerDiv(response)
        }
    }
    bindEvent(addButton, "click", function (event) {
        var model = getAnswerModel()
        request.data = model
        ajax(request)
    })
}

var bindEvents = () => {
    bindAddAnswerEvent()
}

var __main = () => {
    getQuestionData()
    bindEvents()
}

__main()
