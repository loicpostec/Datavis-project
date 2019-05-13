var Chart = require('chart.js');
var d3 = require("d3");
const fetch = require('node-fetch');
const R = require('ramda');
const _ = require('underscore');
const {bb} = require('billboard.js');
let ctxOrbit = $('#chart_orbit');
let ctxRadius = $('#chart_radius');
let ctxTemp = $('#chart_temp');
////////DATA
const DATA = require('planet.json');
const OrbitData = require('orbit.json')

const byGrade = R.groupBy(function(student) {
  const score = student.orbit;
  return score < 1000
    ? "-1000"
    : score < 2000
    ? "+1000"
    : score < 3000
    ? "+2000"
    : score < 4000
    ? "+3000"
    : score < 5000
    ? "+4000"
    : score < 6000
    ? "+5000"
    : score < 7000
    ? "+6000"
    : score < 8000
    ? "+7000"
    : score < 9000
    ? "+8000"
    : score < 10000
    ? "+9000"
    : "+10000";
});

const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }), 
  {},
);



/////// FORMAT

const formatOrbit = ({id, orbit}) => ({
  y: id,
  x: orbit,
})
const formatRadius = ({id, radius}) => ({
  y: id,
  x: radius * 11 // Jupiter radius to earth radius convertion
})
const formatTemp = ({id, temp}) => ({
  y: id,
  x: temp - 273.15, // Kelvin to Celcius convertion
})
const dataOrbit = OrbitData.map(formatOrbit).sort(function(a,b) {
  return a.x- b.x;
 })
 console.log(dataOrbit);
 const dataRadius = DATA.map(formatRadius).sort(function(a,b) {
  return a.y- b.y;
 })
 const dataTemp = DATA.map(formatTemp).sort(function(a,b) {
  return a.y- b.y;
 })



var chart_orbit = new Chart(ctxOrbit, {
  type: 'scatter',
  data: {
    labels: "ok",
      datasets: [{
          label : 'orbit time',
          data: dataOrbit,
          borderColor: ("#000000"),
          pointBorderColor: ("#000000"),
          pointRadius : 1,
      }]
  },
  options: {
    scales: {
      label:{
        fontColor : "#000000",
      },
      xAxes: [{
          type: 'linear',
          position: 'bottom',
          display : true,
          color: ("#000000"),
          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value) {
                return  value + " day";
            }
        }
      }],
      yAxes: [{
        display : false,
    }],
  },
    showLines: false, // disable for all datasets
    title: {
      display: true,
      text: "Orbit time of planets" ,
    }}}
);

var chart_radius = new Chart(ctxRadius, {
  type: 'scatter',
  data: {
    labels: "ok",
      datasets: [{
          label : 'radius',
          data: dataRadius,
          borderColor: ("#000000"),
          pointBorderColor: ("#000000"),
          pointRadius : 1,
      }]
  },
  options: {
    scales: {
      xAxes: [{
          type: 'linear',
          position: 'bottom',
          display : true,
          color: ("#000000"),
          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value) {
                return  value + " earth radius";
            }
        }
      }],
      yAxes: [{
        display : false,
    }],
  },
    showLines: false, // disable for all datasets
    title: {
      display: true,
      text: "Radius of planets" ,
    }}}
);
var chart_temp = new Chart(ctxTemp, {
  type: 'line',
  data: {
      datasets: [{
          label : 'temperature',
          labelColor : ("#000000"),
          data: dataTemp,
          borderColor: ("#000000"),
          pointBorderColor: ("#000000"),
          pointRadius : 1,
      }]
  },
  options: {
    scales: {
      xAxes: [{
          type: 'linear',
          position: 'bottom',
          display : true,
          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value) {
                return  value + " °C";
            }
        }
      }],
      yAxes: [{
        display : false,
    }],
  },
    showLines: false, // disable for all datasets
    title: {
      display: true,
      text: "Temperature of planets" ,
    }}}
);

//////////////////
// NAV MANAGER/////////
//////////////////
$("#nav").hide();
$("#chart_orbit").hide();
$("#chart_radius").hide();
$("#chart_temp").hide();
$("#btnlets").on("click",showOrbit);
$("#orbit").on("click", showOrbit);
$("#radius").on("click", showRadius);
$("#temp").on("click", showTemp);

function showOrbit(){
    $("#chart_orbit").show();
    $("#chart_radius").hide();
    $("#chart_temp").hide();
    $("#nav").show();
    $("#main").hide();
}
function showRadius(){
    $("#chart_orbit").hide();
    $("#chart_radius").show();
    $("#chart_temp").hide();
    $("#nav").show();
    $("#main").hide();
}
function showTemp(){
    $("#chart_orbit").hide();
    $("#chart_radius").hide();
    $("#chart_temp").show();
    $("#nav").show();
    $("#main").hide();
}