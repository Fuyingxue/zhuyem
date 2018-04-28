var hideAskDiv = (askDiv, maskDiv) => {
    askDiv.classList.remove("showAskDiv")
    maskDiv.style.display = "none"
}

var bindAskButtonEvent = (askDiv, maskDiv) => {
    var showAskDivButton = e("#id-button-showAskDiv")
    bindEvent(showAskDivButton, "click", function () {
        askDiv.classList.add("showAskDiv")
        maskDiv.style.display = "block"
    })
}

var bindMaskDivEvent = (askDiv, maskDiv) => {
    bindEvent(maskDiv, "click", function (event) {
        hideAskDiv(askDiv, maskDiv)
    })
}

var bindCloseAskDivButtonEvent = (askDiv, maskDiv) => {
    var closeButton = e("#id-span-closeAskDiv")
    bindEvent(closeButton, "click", function (event) {
        hideAskDiv(askDiv, maskDiv)
    })
}

var getInfo = () => {
    var aTitle = e("#id-input-qTitle")
    var aAuthor = e("#id-input-qAuthor")
    var aContent = e("#id-input-qContent")
    var aModel = {
        title: aTitle.value,
        author: aAuthor.value,
        content: aContent.value,
    }
    return aModel
}

var apiToAddQuestion = (callback) => {
    var model = getInfo()
    var request = {
        url: "/api/question/add",
        method: "POST",
        contentType: "application/json",
        data: model,
        callback,
    }
    ajax(request)
}

var insertDivToList = (response) => {
    var model = {
        answers: response.answers,
        author: response.author,
        title: response.title,
        content: response.content,
        createTime: response.createTime,
        id: response.id,
    }
    var html = getQuestionTemplate(model)
    var questionListDiv = e(".class-div-questionList")
    questionListDiv.insertAdjacentHTML("beforeend", html)
}

var bindAddQuestionEvent = (askDiv, maskDiv) => {
    var addButton = e("#id-button-addQuestion")
    bindEvent(addButton, "click", function (event) {
        apiToAddQuestion((response) => {
            log(response)
            if (document.body.dataset.type != "answered") {
                insertDivToList(response)
            }
            hideAskDiv(askDiv, maskDiv)
        })
    })
}

var bindEvents = () => {
    var askDiv = e(".class-div-askDiv")
    var maskDiv =e(".class-div-mask")
    bindAskButtonEvent(askDiv, maskDiv)
    bindMaskDivEvent(askDiv, maskDiv)
    bindCloseAskDivButtonEvent(askDiv, maskDiv)
    bindAddQuestionEvent(askDiv, maskDiv)
}

var __main = () => {
    bindEvents()
}


__main()
