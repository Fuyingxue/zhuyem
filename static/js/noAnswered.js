var insertQuestionDiv = (response) => {
    var questionListDiv = e(".class-div-questionList")
    for (var i = 0; i < response.length; i++) {
        var item = response[i]
        var html = getQuestionTemplate(item)
        var answersArray = item.answers
        if (answersArray.length > 0) {
            continue
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

var __main = () => {
    getAllQuestion()
}

__main()
