var log = console.log.bind(console)

var e = (element) => {
    return document.querySelector(element)
}

var eAll = (elemets) => {
    return document.querySelectorAll(elemets)
}

var bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, function (event) {
        callback(event)
    })
}

var bindEventAll = (elements, eventName, callback) => {
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i]
        bindEvent(element, eventName, callback)
    }
}

var ajax = (request) => {
    var newRequest = new XMLHttpRequest()
    newRequest.open(request.method, request.url, true)
    if (request.contentType != undefined) {
        newRequest.setRequestHeader("Content-Type", request.contentType)
    }
    newRequest.onreadystatechange = () => {
        if (newRequest.readyState == 4) {
            var data = JSON.parse(newRequest.response)
            request.callback(data)
        }
    }
    if (request.method == "GET") {
        newRequest.send()
        return
    }
    var data = JSON.stringify(request.data)
    console.log("ajax发送的数据", data)
    newRequest.send(data)
}
