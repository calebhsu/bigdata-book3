function analyze(){

  //
  // Getting To Know the Data
  //

  heading('Examples')

  ask('how many measurements were included in this dataset?', example1)

  ask('how many samples does each measurement contain?', example2)

  ask('at the 10-th measurement, what are valid sample values (> 0)?', example3)
  // a sample value is valid if it is greater than zero

  heading('Measurements and Samples')

  ask('how many unique non-zero, non-negative sample values in this dataset? what are they?', func1)

  ask('what is the average time (seconds) between two measurements?', func2)

  ask('at 09:57:18, how many samples in this measurement have the value 7?', func3)

  ask('which measurement has the most number of samples with the value 3?', func4)

  ask('how many measurements have no sample value greater than zero?', func5)

  ask('which valid (i.e., greater than zero) sample value is the most common?', func6)

  heading('Mapping')

  ask('when was the boat furthest away from NYC (40.7127 N, 74.0059 W)? what was the distance?', func7)
  // use Leaflet to draw a line between NYC and this "furtherest away" location

  ask('what was the path of the boat?', func8)
  // use Leaflet to draw a line between every two locations

  ask('where were the most common sample value measured?', func9)
  // say, your answer to Question Six is 13, draw a marker for each measurement that has
  // at least one sample whose value is 13

  ask('how does the density of valid sample values change across the geographical area?', func10)
  // use the brightness to indicate high number of valid sample values each
  // for each measurement, draw a marker,
  // use the brightness to represent the number of valid samples
  // the brighter a spot, the higher the number
  // for those measurements without a valid sample, draw nothing

  heading('Science')

  ask('what is the distribution of fish?', func11)

  ask('what is the distribution of  are schools of zooplankton?', func12)


  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  })
  toggleSourecode()
}

function example1(){
  return items.length
}

function example2(){
  return items[0].Samples.length
}

function example3(){
  return _.filter(items[9].Samples, function(d){
    return d > 0
  }).join(', ')
}

function func1(){
  var samples = _.flatten(_.pluck(items, 'Samples'))
  samples = _.uniq(_.filter(samples, function(d) {
    return d > 0
  }))

  return 'The unique, non-negative, nonzero sample values are ' + samples.join(", ") + '.'
}

function func2(){
  var pairs = _.pairs(items)
  var difference = []

  // Thanks again Parker
  for (var i = 0; i < items.length - 1; i++) {
    var first = pairs[i][1].Ping_time.split(':')
    var second = pairs[i + 1][1].Ping_time.split(':')

    if (parseInt(second[2]) > parseInt(first[2])) {
      var diff = parseInt(second[2]) - parseInt(first[2])
      difference.push(diff)
    }
  }

  var avg = _.sum(difference) / difference.length
  return 'The average time between two measurements was ' + avg.toFixed(2) + ' seconds.'
}

function func3(){
  var time = _.filter(items, function(d) {
    return d['Ping_time'] == "09:57:18"
  })

  time = _.flatten(_.pluck(time, 'Samples'))

  time = _.filter(time, function(d) {
    return _.includes(d, "7.000000")
  }).length

  return time + ' samples in this measurement have the value 7.'
}

function func4(){
  var group = _.groupBy(items, 'Ping_time')

  // maps number of elements in array that includes a 3 to the time
  group = _.mapValues(group, function(d) {
    return _.filter(d[0].Samples, function(e) {
      return _.includes(e, "3.000000")
    }).length
  })

  var max = _.max(group)

  group = _.pull(_.map(group, function(value, key) {
    if (value == max)
      return key
  }), undefined)

  return 'The measurement occurred at ' + group + '.'
}

function func5(){
  var neg = _.filter(items, function(d) {
    return (_.max(d.Samples) <= 0)
  })

  return neg.length + ' measurements have no sample value greater than 0.'
}

function func6(){
  var valid = _.flatten(_.pluck(items, 'Samples'))

  valid = _.countBy(_.filter(valid, function(d) {
    return d > 0
  }))

  var max = _.max(valid)

  valid = _.pull(_.map(valid, function(value, key) {
    if (value == max)
      return key
  }), undefined)

  return 'The most common valid sample value is ' + valid + '.'
}

function func7(){
  var ny = [40.7127, -74.0059]
  var nyObj = {'latitude': 40.7127, 'longitude': -74.0059}

  // collection of all distances to NY
  var dist = []
  _.forEach(items, function(d) {
    var pos = {'latitude': d.Latitude, 'longitude': d.Longitude}
    var length = geolib.getDistance(nyObj, pos)
    dist.push(length)
  })

  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, ny, 5)

  var max = _.max(dist)

  var filt = _.filter(items, function(d) {
    var tempCoord = {'latitude': d.Latitude, 'longitude': d.Longitude}

    // Plots furthest boat
    if (geolib.getDistance(nyObj, tempCoord) == max) { 
       var furthest = [d.Latitude, d.Longitude]
       var circle = L.circle(furthest, 500, {
           color: 'red',
           fillColor: '#f03',
           fillOpacity: 0.5
       }).addTo(map)
       return d
     }
 })

  // gets time
  var time = filt[0]['Ping_time']

  // Plots New York City
  var circle = L.circle(ny, 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
  }).addTo(map);

  return 'The boat was furthest away at ' + time + ' with a distance of ' + max + '.'
 }

function func8(){
  var ny = [40.7127, -74.0059]
  var nyObj = {'latitude': 40.7127, 'longitude': -74.0059}

  // collection of all distances to NY
  var dist = []
  _.forEach(items, function(d) {
    var pos = {'latitude': d.Latitude, 'longitude': d.Longitude}
    var length = geolib.getDistance(nyObj, pos)
    dist.push(length)
  })

  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, ny, 5)

  // Finds maximum distance, compare to all distances of all other coords
  var max = _.max(dist)

  var filt = _.filter(items, function(d) {
    var tempCoord = {'latitude': d.Latitude, 'longitude': d.Longitude}

    // Plots furthest boat
    if (geolib.getDistance(nyObj, tempCoord) == max) { 
       var furthest = [d.Latitude, d.Longitude]
       var circle = L.circle(furthest, 500, {
           color: 'red',
           fillColor: '#f03',
           fillOpacity: 0.5
       }).addTo(map)
       return d
     }
 })

  // gets time & coordinates
  var time = filt[0]['Ping_time']
  var boat = [parseFloat(filt[0].Latitude), parseFloat(filt[0].Longitude)]

  // Plots New York City
  var circle = L.circle(ny, 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
  }).addTo(map);

  // combined coordinates of NYC & boat, plots line between them
  var coords = [boat, ny]
  var polyline = L.polyline(coords, {color: 'yellow'}).addTo(map);
}

function func9(){
  // Most common sample value
  var valid = _.flatten(_.pluck(items, 'Samples'))

  valid = _.countBy(_.filter(valid, function(d) {
    return d > 0
  }))

  var max = _.max(valid)

  valid = _.pull(_.map(valid, function(value, key) {
    if (value == max)
      return key
  }), undefined)

  var common = _.filter(items, function(d) {
    return _.includes(d.Samples, valid[0])
  })

  var first = common[0]
  var pos = [first.Latitude, first.Longitude]

  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 15)

  _.forEach(common, function(c) {
    L.circle([c.Latitude, c.Longitude], 5, {color: 'red'}).addTo(map);
  })
}

function func10(){
  var first = items[0]
  var pos = [first.Latitude, first.Longitude]

  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 15)

  _.forEach(items, function(d) {
    var valid = _.filter(d.Samples, function(e) {
      return e > 0
    }).length

    L.circle([d.Latitude, d.Longitude], 5, {
      color: 'blue',
      fillColor: 'blue',
      fillOpacity: 0.5
    }).addTo(map);

  })

  return '...'
}

function func11(){
  var first = items[0]
  var pos = [first.Latitude, first.Longitude]

  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 13)

  _.forEach(items, function(d) {
    // fish at lower frequencies (1 & 3 & 4)
    // list of things to filter for (help cred: Parker)
    if (_.includes(d.Samples, '1.000000') 
      || _.includes(d.Samples, '3.000000') 
      || _.includes(d.Samples, '4.000000')
      || _.includes(d.Samples, '8.000000')
      || _.includes(d.Samples, '10.000000')
      || _.includes(d.Samples, '30.000000')
      || _.includes(d.Samples, '32.000000') 
      || _.includes(d.Samples, '33.000000')
      || _.includes(d.Samples, '37.000000')
      || _.includes(d.Samples, '45.000000') 
      || _.includes(d.Samples, '53.000000')) {

      var coord = [d.Latitude, d.Longitude]
      var circle = L.circle(coord, 2, {
          color: 'orange',
          fillColor: 'orange',
          fillOpacity: 0.5
        }).addTo(map);
    }
  })
}

function func12(){
  var first = items[0]
  var pos = [first.Latitude, first.Longitude]

  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 13)

  _.forEach(items, function(d) {
    // plankton at higher frequencies
    // list of things to filter for (help cred: Parker)
    if (_.includes(d.Samples, '7.000000')
      || _.includes(d.Samples, '8.000000')  
      || _.includes(d.Samples, '10.000000') 
      || _.includes(d.Samples, '13.000000') 
      || _.includes(d.Samples, '20.000000')
      || _.includes(d.Samples, '36.000000') 
      || _.includes(d.Samples, '37.000000') 
      || _.includes(d.Samples, '40.000000') 
      || _.includes(d.Samples, '42.000000')
      || _.includes(d.Samples, '45.000000') 
      || _.includes(d.Samples, '49.000000')       
      || _.includes(d.Samples, '53.000000')) {

      var coord = [d.Latitude, d.Longitude]
      var circle = L.circle(coord, 2, {
          color: 'green',
          fillColor: '#green',
          fillOpacity: 0.5
        }).addTo(map);
    }
  })
}
