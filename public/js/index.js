class MeterManger {
  constructor(canvasDiv) {

    this.canvasDiv = canvasDiv;
    this.freeZoneColor = "#eff59f";
    this.step = 4
    this.isVisible = true;

    this.opts = {
      angle: 0,

      pointer: {
        length: 0.67, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: "#353535", // Fill color
      },
      limitMax: true, // If false, max value increases automatically if value > maxValue
      limitMin: true,
      colorStart: "#6F6EA0", // Colors
      colorStop: "#C0C0DB", // just experiment with them
      strokeColor: "#EEEEEE",

      highDpiSupport: true, // High resolution support
      renderTicks: {
        divisions: 2,
        divWidth: 0.5,
        divLength: 0.58,
        divColor: "#353535",
        subDivisions: 5,
        subLength: 0.45,
        subWidth: 0.5,
        subColor: "#353535",
      },
      staticZones: this.getBlankZone(),
    };    

    this.currentValue = 50

    this.pointZones = this.generateRandomPointZones();

    this.renderMeter()

    
  }

  renderMeter() {
    var target = this.canvasDiv; // your canvas element
    this.opts.staticZones = this.isVisible? this.getPointZones() : this.getBlankZone();
    this.opts.renderTicks = !this.isVisible? {
        divisions: 2,
        divWidth: 0.5,
        divLength: 0.58,
        divColor: "#353535",
        subDivisions: 5,
        subLength: 0.45,
        subWidth: 0.5,
        subColor: "#353535",
      } : {}
    this.gauge = new Gauge(target);
    this.gauge.setOptions(this.opts);
    this.gauge.maxValue = 200; // set max gauge value
    this.gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
    this.gauge.animationSpeed = 1; // set animation speed (32 is default value)
    this.gauge.set(this.currentValue); // set actual value
    this.gauge.animationSpeed = 10; // set animation speed (32 is default value)
  }

  getBlankZone() {
    return [{ strokeStyle: this.freeZoneColor, min: 0, max: 200 }];
  }

  getPointZones() {
    return this.pointZones;
  }

  generateRandomPointZones() {
    let startZone = Math.floor(Math.random() * 160);
    const increment = 8;
    let range = [];
    for (let i = 0; i < 10; i++) {
      range.push(startZone + increment * i);
    }
    return [
      { strokeStyle: this.freeZoneColor, min: 0, max: range[0] },
      { strokeStyle: "#130b0b", min: range[0], max: range[1] },
      { strokeStyle: "#FFDD00", min: range[1], max: range[2] },
      { strokeStyle: "#130b0b", min: range[2], max: range[3] },
      { strokeStyle: "#FFDD00", min: range[3], max: range[4] },
      { strokeStyle: "#130b0b", min: range[4], max: range[5] },
      { strokeStyle: this.freeZoneColor, min: range[5], max: 200 },
    ];
  }

  increment() {
    this.currentValue = this.gauge.value + this.step
    this.gauge.set(this.currentValue);
  }

  decrement() {
    this.currentValue = this.gauge.value - this.step
    this.gauge.set(this.currentValue);
  }

  toggleVisiblity() {
    this.isVisible = !this.isVisible;
    this.renderMeter()
  }

  spin() {
    if(this.isVisible){
        this.pointZones = this.generateRandomPointZones()
        this.renderMeter()
    }
  }
}

let meter = new MeterManger(document.getElementById("knob"));
// function plusMeter(theValue) {
//   console.log("plus1 ")
//   gauge.increment()
// }

// function minusMeter(theValue) {
//     // gauge.setOptions(opts1)
//     gauge.decrement()
//   }

// var opts = {
//   angle: 0,

//   pointer: {
//     length: 0.67, // // Relative to gauge radius
//     strokeWidth: 0.035, // The thickness
//     color: "#353535", // Fill color
//   },
//   limitMax: true, // If false, max value increases automatically if value > maxValue
//   limitMin: true,
//   colorStart: "#6F6EA0", // Colors
//   colorStop: "#C0C0DB", // just experiment with them
//   strokeColor: "#EEEEEE",

//   highDpiSupport: true, // High resolution support
//   renderTicks: {
//     divisions: 2,
//     divWidth: 0.5,
//     divLength: 0.58,
//     divColor: "#4400ff",
//     subDivisions: 5,
//     subLength: 0.45,
//     subWidth: 0.5,
//     subColor: "#6d53ff",
//   },
//   staticZones: [
//     { strokeStyle: "#F03E3E", min: 0, max: 50 }, // Red from 100 to 130
//     { strokeStyle: "#FFDD00", min: 50, max: 100 }, // Yellow
//     { strokeStyle: "#30B32D", min: 100, max: 200 }, // Green
//   ],
//   // renderTicks is Optional
// };
// var target = document.getElementById("knob"); // your canvas element
// opts.staticZones = getZones(Math.floor(Math.random() * 160));
// var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
// gauge.maxValue = 200; // set max gauge value
// gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
// gauge.animationSpeed = 1; // set animation speed (32 is default value)
// gauge.set(200); // set actual value
// gauge.animationSpeed = 10; // set animation speed (32 is default value)

// function getZones(startZone) {
//   const increment = 8;
//   let range = [];
//   for (let i = 0; i < 10; i++) {
//     range.push(startZone + increment * i);
//   }
//   let freeZoneColor = "#6099f0";
//   console.log(range);
//   return [
//     { strokeStyle: freeZoneColor, min: 0, max: range[0] }, // Red from 100 to 130
//     { strokeStyle: "#F03E3E", min: range[0], max: range[1] }, // Red from 100 to 130
//     { strokeStyle: "#FFDD00", min: range[1], max: range[2] }, // Yellow
//     { strokeStyle: "#30B32D", min: range[2], max: range[3] }, // Green
//     { strokeStyle: "#FFDD00", min: range[3], max: range[4] }, // Yellow
//     { strokeStyle: "#F03E3E", min: range[4], max: range[5] }, // Red from 100 to 130
//     { strokeStyle: freeZoneColor, min: range[5], max: 200 }, // Red from 100 to 130
//   ];
// }
// getZones(0);

// function setRandomRange() {
//   // gauge.animationSpeed = 0;
//   //get random value from 0 to
//   opts.staticZones = getZones(0);
//   gauge.setOptions(opts);
//   // gauge.set(10)
//   // gauge.animationSpeed = 3;
// }
// // setRandomRange()

function setCards() {
  let gameCards = cards[Math.floor(Math.random() * cards.length)];
  document.getElementById("leftcard").innerText = gameCards[0];
  document.getElementById("rightcard").innerText = gameCards[1];
}

setCards();
