var insertQuestionDiv = (response) => {
    var questionListDiv = e(".class-div-questionList")
    for (var i = 0; i < response.length; i++) {
        var item = response[i]
        var html = getQuestionTemplate(item)
        var answersArray = item.answers
        if (answersArray.length > 0) {
            var answersHTML = getAnswerListTemplate(answersArray)
            log("answersHTML", answersHTML)
            html += answersHTML
        }
        questionListDiv.insertAdjacentHTML("beforeend", html)
    }
}

var getAllQuestion = () => {
    var request = {
        method: "GET",
        url: "/api/question/all",
        callback: (response) => {
            log("response", response)
            insertQuestionDiv(response)
        }
    }
    ajax(request)
}

var showAnswerEvent = (self) => {
    if (self.innerHTML != "暂无响应") {
        var parentDiv = self.closest(".class-div-questionItem")
        log("parentDiv", parentDiv)
        var answerList = parentDiv.querySelector(".class-div-answers")
        answerList.classList.toggle("blockShow")
    }
}

var bindQuestionListEvent = () => {
    var questionListDiv = e(".class-div-questionList")
    bindEvent(questionListDiv, "click", function (event) {
        var self = event.target
        if (self.classList.contains("class-span-showAnswer")) {
            showAnswerEvent(self)
        }
    })
}

var bindEvents = () => {
    bindQuestionListEvent()
}

var __main = () => {
    getAllQuestion()
    bindEvents()
}

__main()
