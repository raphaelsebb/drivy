'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

//functions
function exercise_5(rental) {
  console.log("**********");
  var carid = rental.carId;
  var pricePerKm;
  var pricePerDay;

  var i;
  for(i = 0; i < cars.length; i++) {
    if (cars[i].id == carid) {
      console.log(cars[i].id);
      pricePerKm = cars[i].pricePerKm;
      pricePerDay = cars[i].pricePerDay;
      console.log("Price per Km "+pricePerKm);
      console.log("Price per Day "+pricePerDay);
    }
  }

  var d1 = new Date(rental.returnDate)
  var d2 = new Date(rental.pickupDate)
  var days = nDays(d1,d2);

  console.log(days + " days");

  pricePerDay = (1 - reducePrice(days)) * pricePerDay;

  var time = pricePerDay * days;
  console.log(rental.distance + " km");
  var distance = pricePerKm * rental.distance;
  var price = time + distance;

  rental.price = price;
  var commission = price * 0.3;
  rental.commission.insurance = commission * 0.5;
  rental.commission.assistance = days;
  rental.commission.drivy = commission - rental.commission.insurance - rental.commission.assistance;

  var option
  if(rental.options.deductibleReduction == true) {
    option = days * 4;
    console.log("Option " + option);
    rental.commission.drivy = commission - rental.commission.insurance - rental.commission.assistance + option;
    price += option;
  }

  credit_debit(rental, commission);

  return "Cost = " + price;
}

function nDays(d1, d2){
  var days = ((d1 - d2) / (24*60*60*1000)) + 1;
  return days;
}

function reducePrice(days){
  var reduce = 0;
  if(days > 1 && days <= 4){
    reduce = 0.1;
    console.log("reduce 0.1");
  }
  else if(days > 4 && days <= 10){
    reduce = 0.3;
    console.log("reduce 0.3");
  }
  else if(days > 10){
    reduce = 0.5;
    console.log("reduce 0.5");
  }
  return reduce;
}

function credit_debit(rental){
  var id = rental.id;
  var i;
  for(i = 0; i < actors.length; i++){
    if(id == actors[i].rentalId){
      actors[i].payment[0].amount = rental.price;
      actors[i].payment[1].amount = rental.price * 0.7;
      actors[i].payment[2].amount = rental.commission.insurance;
      actors[i].payment[3].amount = rental.commission.assistance;
      actors[i].payment[4].amount = rental.commission.drivy;
    }
  }
}

var i;
for(i = 0; i < rentals.length; i++) {
  console.log(exercise_5(rentals[i]));
}

//logs
console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
