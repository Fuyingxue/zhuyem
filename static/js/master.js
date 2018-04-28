/**
 * Created by Baron on 2018/4/25.
 */

var log = console.log.bind(console)

const e = (selector) => {
    return document.querySelector(selector)
}

const es = (sel) => {
    return document.querySelectorAll(sel)
}

const appendHtml = (element, html) => {
    element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}

const bindAll = (selector, eventName, callback) => {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

const goNext = function(newIndex) {
    var s = e ('.section')
    var father = s.parentElement
    var grandpa = father.parentElement
    var newId = '#dian-'+ String(newIndex)
    var className = 'active'
    removeClassAll(className)
    var c = e(newId)
    c.classList.add(className)
    var n = (-100) * (newIndex)
    // console.log('n', n);
    e('.allSection').style.transform = `translate(${n}vw, -50%)`;
    grandpa.dataset.sections = newIndex
}

const setTag = function(index) {
    removeClassAll('highlight')
    es('.nav-a')[index].classList.add('highlight')
    e('line').style.transform = `translateX(${index * 5}rem)`
}

const goPrevPage = () => {
    var now = e('.content').dataset.page
    var prev = Number(now) - 1
    goPage(prev)
}

const goNextPage = () => {
    var now = e('.content').dataset.page
    var next = Number(now) + 1
    // log('goNextPage', next);
    goPage(next)
}

const goPage = (index) => {
    index = Number(index)
    if (index >= 0 && index <= 3) {
        e('.content').style.transform = `translateY(${index*(-100)}vh)`;
        e('.content').dataset.page = index
        setTag(index)
    }
    if (index == 3) {
        e('.nextPage').classList.add('hidden')
    } else {
        e('.nextPage').classList.remove('hidden')
    }
}

const playNext = () => {
    var s = e ('.section')
    var father = s.parentElement
    var grandpa = father.parentElement
    var zongUu = parseInt(grandpa.dataset.article)
    var index = parseInt(grandpa.dataset.sections)
    var newIndex = (index + 1) % zongUu
    goNext(newIndex)
}


const bindTiao = () => {
    var selector = '.dian'
    bindAll(selector, 'click', (event) => {
        var target = event.target
        var id = parseInt(target.dataset.index)
        var newIndex = '#section-'+ String(id)
        var className = 'active'
        removeClassAll(className)
        target.classList.add(className)
        var n = (-100) * (id)
        e('.allSection').style.transform = `translate(${n}vw, -50%)`;
        var father = target.parentElement
        var grandpa = father.parentElement
        grandpa.dataset.sections = id
    })
}

const bindHeader = () => {
    var selector = '.nav-li'
    bindAll(selector, 'click', (event) => {
        var target = event.target
        var newIndex = parseInt(target.dataset.nav)
        var newId = '#nav-'+ String(newIndex)
        var className = 'highlight'
        removeClassAll(className)
        var c = e(newId)
        c.classList.add(className)
    })

    bindAll(selector, 'click', (event) => {
        var target = event.target
        var newIndex = parseInt(target.dataset.nav)
        goPage(newIndex)
    })
}

const bindWheel = () => {
    e('body').addEventListener('mousewheel', (event) => {
        var content = e('.content')
        var index = parseInt(content.dataset.page)
        if (event.deltaY > 0) {
            var newIndex = index + 1
            goPage(newIndex)
        } else {
            var newIndex = index - 1
            goPage(newIndex)
        }
    })
}

const bindNextbutton = () => {
    var next = e('.next')
    bindEvent(next, 'click', () => {
        playNext()
    })
}

const playPrev = () => {
    var s = e ('.section')
    var father = s.parentElement
    var grandpa = father.parentElement
    var zongUu = parseInt(grandpa.dataset.article)
    var index = parseInt(grandpa.dataset.sections)
    var newIndex = (index + zongUu - 1) % zongUu
    goNext(newIndex)
}

const bindPrevbutton = () => {
    var prev = e('.prev')
    bindEvent(prev, 'click', () => {
        playPrev()
    })
}


const themeNew = (newIndex) => {
    if (newIndex == 0) {
        e('.theme-color').style.background = '#353d40';
        e('.lazy').src = `/img/${newIndex}.png`
    }
    else if (newIndex == 1) {
        e('.theme-color').style.background = 'rgba(242, 70, 70, 0.34)';
        e('.lazy').src = `/img/${newIndex}.png`
    }
    else if (newIndex == 2) {
        e('.theme-color').style.background = 'rgba(118, 195, 221, 0.73)';
        e('.lazy').src = `/img/${newIndex}.png`
    }

}

const bindYuan = () => {
    var selector = '.circle'
    bindAll(selector, 'click', function(event){
        var target = event.target
        var newIndex = parseInt(target.dataset.index)
        themeNew(newIndex)
        var father = target.parentElement
        var grandpa = father.parentElement
        var grandpapa = grandpa.parentElement
        grandpapa.dataset.theme = newIndex
    })
}

const themeNext = () => {
    var s = e ('.theme-color')
    var father = s.parentElement
    var grandpa = father.parentElement
    var zongUu = parseInt(grandpa.dataset.all)
    var index = parseInt(grandpa.dataset.theme)
    var newIndex = (index + 1) % zongUu
    themeNew(newIndex)
    grandpa.dataset.theme = newIndex
}

const bindNtbutton = () => {
    var button = e('.nextPage')
    bindEvent(button, 'click', function(event){
        goNextPage()
    })
}

const bindButton = () => {
    var musicButton = e('.music-button')
    var bannerButton = e('.banner-button')
    bindEvent(musicButton, 'click', () => {
        e('.music-introduce').classList.toggle('notShow')
        e('.about-article').classList.toggle('notShow')
    })

    bindEvent(bannerButton, 'click', function(){
        e('.photo-introduce').classList.toggle('notShow')
        e('.work-photo').classList.toggle('notShow')
    })
}

const show = () => {
    var className = 'noShow'
    e('.write').classList.remove(className)
    e('.write-1').classList.remove(className)
}



//  检测滑动方向
const angleBySlide = function(dx, dy) {
    return Math.atan2(dy,dx) * 180 / Math.PI
}

// 判断方向
const judgeDirection = (sX, sY, eX, eY) => {
    /*
     根据坐标判断 方向
     return: false 为判断不出
     'up' 为上
     'down'
     'right'
     'left'
     */
    var dx = eX - sX
    var dy = sY - eY
    var angle = angleBySlide(dx, dy);
    // 滑动距离太短 的情况
    if (Math.abs(dx) < 30 && Math.abs(dy) < 30) {
        return false
    } else if (angle >= -45 && angle < 45) {
        return 'right'
    } else if (angle >= 45 && angle < 135) {
        return 'up'
    } else if (angle >= -135 && angle < -45) {
        return 'down'
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        return 'left'
    }
}

// 给 element 绑定事件
const bindSlideEvent = () => {
    var startX, startY

    e('.content').addEventListener('touchstart', (event) => {
        // console.log('touchstart', event);
        startX = event.touches[0].pageX
        startY = event.touches[0].pageY
    })

    e('.content').addEventListener('touchmove', (event) => {
        event.preventDefault()
    })

    e('.content').addEventListener('touchend', (event) => {
        var endX = event.changedTouches[0].pageX;
        var endY = event.changedTouches[0].pageY;

        var dire = judgeDirection(startX, startY, endX, endY)
        if (dire == 'left') {
            let n = e('.main-content').dataset.sections
            if (n != '2') {
                clearInterval(Status.banner)
                playNext()
                Status.banner = setInterval(playNext, 10000)
            }
        } else if (dire == 'right') {
            let n = e('.main-content').dataset.sections
            if (n != '0') {
                clearInterval(Status.banner)
                playPrev()
                Status.banner = setInterval(playNext, 10000)
            }
        } else if (dire == 'up') {
            goNextPage()
        } else if (dire == 'down') {
            goPrevPage()
        } else if (!dire) {
            // 检测不出方向
            return false
        }
    })
}


const bindall = () => {
    bindTiao()
    bindHeader()
    bindNtbutton()
    bindWheel()
    bindNextbutton()
    bindPrevbutton()
    bindYuan()
    bindButton()
    bindSlideEvent()
}

const init = () => {
    Status.banner = setInterval(playNext, 10000)
    // setInterval(themeNext, 5000)
    setTimeout(show, 2000)
}

const __main = function(){
    bindall()
    init()
}

var Status = {
    banner: '',
}

__main()
