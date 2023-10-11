var start = document.getElementById("timerstart")
start.addEventListener('click', starting)
var pTimer = document.getElementById("timer")
var divbut = document.getElementById("buttondiv")
var clearTime = document.getElementById("timeclear")
clearTime.addEventListener("click", clearP)
var table = document.getElementById("sampletable")
var sample = document.getElementById("sampletime")
sample.addEventListener('click', sampleAdd)

var timeint;
var sec = 0
var min = 0
var hour = 0

function starting() {
  clearTime.setAttribute('disables', "disabled")
  divbut.innerHTML = "<button class='start' id='stop'>Stop</button>"
  var stop = document.getElementById("stop")
  stop.addEventListener('click', timerStop)
  timeint = setInterval(timerStart, 1000)

}
var strSeq = "0" + 0;
var strMin = "0" + 0;
var strHour = "0" + 0;

function timerStart() {
  sec++
  strSeq = sec;
  strMin = min;
  strHour = hour;

  if (sec < 10) {
    strSeq = "0" + sec
  }
  if (min < 10) {
    strMin = "0" + min
  }
  if (hour < 10) {
    strHour = "0" + hour
  }
  if (sec == 60) {
    min++
    sec = 0
  }
  if (min == 60) {
    min = 0
    hour++
  }

  pTimer.innerText = strHour + ":" + strMin + ":" + strSeq
}

function timerStop() {
  clearInterval(timeint)
  divbut.innerHTML = "<button class='start' id='timerstart'>Start</button>"
  start = document.getElementById("timerstart")
  start.addEventListener('click', starting)
  clearTime.removeAttribute('disabled', "disabled")
}

function clearP() {
  sec = -1
  min = 0
  hour = 0
  timerStart()
}
var timeTable = document.getElementById("timertable")

var sampleQuan = 0;
var timeArr = []
function sampleAdd() {
  sampleQuan++

  var timeObj = {
    num: sampleQuan,
    time: strHour + ":" + strMin + ":" + strSeq
  }
  timeArr.push(timeObj)
  tableAdd()
}

function tableAdd() {
  timeTable.classList.remove('none')
  var cost = ""
  var justiMain = displayData(docMain, "justify-center")
  if (justiMain) {
    docMain.classList.remove("justify-center")
  }

  for (var i = 0; i < timeArr.length; i++) {
    var tableTr = "<tr><td>" + timeArr[i].num + "</td><td>" + timeArr[i].time + "</td></tr>"
    cost = cost + tableTr
  }
  timeTable.innerHTML = "<div class='overflow'><table class='tabletime'>" + cost + "</table></div><div class='cleardiv'><button class='clesamp' id='sampleclear'>Clear sample</button></div>"
  var sampleClear = document.getElementById("sampleclear")
  sampleClear.addEventListener('click', clearsapm)
}
var valueTb = document.getElementById("sampletable")
valueTb.addEventListener('click', displeyValue)
var docMain = document.getElementById("maindoc")

function displeyValue() {
  var justiMainVAlue = displayData(docMain, "justify-center")
  
  if (justiMainVAlue) {
    docMain.classList.remove("justify-center")
  }
  else{
      docMain.classList.add("justify-center")
  }
  var disVal = displayData(timeTable, "none")

  if (disVal) {
    timeTable.classList.remove("none")
  }
  else {
    timeTable.classList.add("none")
  }
}

function displayData(varId, classDiv) {
  for (var i = 0; i < varId.classList.length; i++) {

    if (varId.classList[i] == classDiv) {
      return true
    }

  }
}

function clearsapm() {
  timeArr = []
  timeTable.innerHTML = ""
}