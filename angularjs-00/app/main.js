import $ from 'jquery';

$('h1').css({'color': 'red'});

console.log("boo")

fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=2de143494c0b295cca9337e1e96b00e0')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    $('h1').text(json.weather[0].description);
    console.log('parsed json', json.weather[0].description)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
