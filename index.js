'use strict';
// const p = document.querySelector(".js-time");
// const btnStart = document.querySelector(".js-start");
// const btnReset = document.querySelector(".js-reset");
// const btnTake = document.querySelector(".js-take-lap");
// const ul = document.querySelector(".js-laps");
// let interval ;

// const timer = {
//   startTime: null,
//   deltaTime: null,
//   id: null,
//   isActiv: false,
//   isPause: false,
//   pauseTime: null
// };

// function startTimer(){
//   btnReset.disabled = false;
//   if(!timer.isActiv) {
//     timer.isActiv = true;
//     btnStart.innerHTML = 'Pause';
//     timer.startTime =  Date.now();
//     interval = setInterval(() => {
//       timer.deltaTime = Date.now() - timer.startTime;
//       updateClockface(p, timer.deltaTime);
//     },100)
//   }
//    else {
//      if(!timer.isPause){
//        timer.isPause = true;
//        btnStart.innerHTML = 'Continue';
//        clearInterval(interval);
//        timer.pauseTime = timer.deltaTime;
//      }
//      else {
//       timer.isPause = false;
//       btnStart.innerHTML = 'Pause';
//       timer.startTime = Date.now() - timer.pauseTime;
//       interval = setInterval(() => {
//         timer.deltaTime = Date.now() - timer.startTime;
//         updateClockface(p, timer.deltaTime);
//       },100)
//      }
//    }
// }

// function resetTimer(){
//   clearInterval(interval);
//   timer.isActiv = false;
//   timer.isPause = false;
//   updateClockface(p, 0);
//   ul.innerHTML = '';
//   btnStart.innerHTML = 'start';
//   btnReset.disabled = true;
// }

// function takeLap(){
//   if(!timer.isPause&&timer.isActiv){
// ul.innerHTML += `<li> ${p.innerHTML}</li>`;
//   }
// }
// btnStart.addEventListener('click', startTimer);
// btnReset.addEventListener('click', resetTimer);
// btnTake.addEventListener('click', takeLap);


// function getFormattedTime(time) {
//   let date = new Date(time);
//   let min = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
//       sec = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds(),
//       millisecx100 = Math.floor(date.getMilliseconds()/100);
//   return `${min}:${sec}.${millisecx100}`;
// }

// function updateClockface(elem, time) {
//    elem.textContent = getFormattedTime(time);
// }

function Stopwatch (DOMLink) {
  this.DOMLink = DOMLink;
  this.DOMLink.innerHTML = '<p class="time js-time">00:00.0</p><button class="btn js-start">Start</button>\
    <button class="btn js-take-lap">Lap</button>\
    <button class="btn js-reset">Reset</button><ul class="laps js-laps"></ul>';
  this.clockface = this.DOMLink.querySelector(".js-time");
  this.startBtn = this.DOMLink.querySelector(".js-start");
  this.resetBtn = this.DOMLink.querySelector(".js-reset");
  this.loopBtn = this.DOMLink.querySelector(".js-take-lap");
  this.lapsList = this.DOMLink.querySelector(".js-laps");
  this.timer = {
    startTime: null,
    deltaTime: null,
    pauseTime: null,
    isActive: false,
    isPause: false,
    lapsCount: 0
  };
  this.interval = null;
  this.startBtn.addEventListener('click', () => {
    this.resetBtn.disabled = false;
    if(!this.timer.isActive) {
      this.startBtn.innerHTML = 'Pause';
      this.timer.isActive = true;
      this.timer.startTime = Date.now();
      this.interval = setInterval(()=>{
        this.timer.deltaTime = Date.now() - this.timer.startTime;
        this.updateClockface(this.clockface, this.timer.deltaTime);
      }, 100);
    }
    else {
      if(!this.timer.isPause) {
        this.timer.isPause = true;
        this.timer.pauseTime = this.timer.deltaTime;
        this.startBtn.innerHTML = 'Continue';
        clearInterval(this.interval);
      }
      else {
        this.startBtn.innerHTML = 'Pause';
        this.timer.isPause = false;
        this.timer.startTime = Date.now() - this.timer.pauseTime;
        this.interval = setInterval(()=>{
          this.timer.deltaTime = Date.now() - this.timer.startTime;
          this.updateClockface(this.clockface, this.timer.deltaTime);
        }, 100);
      }
    }
  });
  this.resetBtn.addEventListener('click', () => {
    clearInterval(this.interval);
    this.timer.isActive = false;
    this.timer.isPause = false;
    this.updateClockface(this.clockface, 0);
    this.lapsList.innerHTML = '';
    this.timer.lapsCount = 0;
    this.startBtn.innerHTML = 'Start';
    this.startBtn.disabled = false;
    this.resetBtn.disabled = true;
  });
  this.loopBtn.addEventListener('click', () => {
    if(!this.timer.isPause && this.timer.isActive) {
      this.timer.lapsCount++;
      this.lapsList.innerHTML += `<li>${this.timer.lapsCount} -> ${this.clockface.innerHTML}</li>`;
    }
  });
}

Stopwatch.prototype.updateClockface = function updateClockface(elem, time) {
  elem.textContent = this.getFormattedTime(time);
}

Stopwatch.prototype.getFormattedTime = function getFormattedTime(time) {
  let date = new Date(time);
  let min = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
    sec = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds(),
    millisecx100 = Math.floor(date.getMilliseconds()/100);
  return `${min}:${sec}.${millisecx100}`;
}

const parentArrey = document.querySelectorAll(".stopwatch");
const stopwatchs = [];

parentArrey.forEach(element => {
  stopwatchs.push(new Stopwatch(element));
});