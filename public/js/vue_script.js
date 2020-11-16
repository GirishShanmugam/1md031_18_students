/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */
'use strict';
var socket = io();

/* A function that loops through the array and inserts the information
to the burger selection section of the index.html file*/
function populateWebPageVue() {
  var item1 = {
    name: 'The Fire Burger',
    kCal: 750,
    hasGluten: true,
    hasLactose:true,
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKCXIBqrFyAGQn_7aNAK4bMBzCLWenq-Y8bg&usqp=CAU"
  };

  var item2 = {
    name: 'Fried Turkey Burger',
    kCal: 600,
    hasGluten: false,
    hasLactose: true,
    image:"https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-qpc-deluxe-burger.jpg"
  }

  var item3 = {
    name: 'A Double w/ Cheese',
    kCal: 1800,
    hasGluten: true,
    hasLactose:true,
    image:"https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-Double-Quarter-Pounder-with-Cheese.jpg"
  };

  var item4 = {
    name: 'Sous Vide Burger',
    kCal: 2500,
    hasGluten: false,
    hasLactose:false,
    image:"https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg"
  };

  var item5 = {
    name: 'Mushroom-meat Blend',
    kCal: 1000,
    hasGluten: true,
    hasLactose:false,
    image:"https://www.thepacker.com/sites/default/files/sonic-slinger.jpg"
  };

  var vm = new Vue({
    el: '#burgers-list',
    data: {
      burgers : [item1, item2, item3, item4, item5]
    }
  });
}

/* A function that loads the information from the menu.js json object and
inserts the information to the burger selection section of the index.html file*/
function loadInformationVue() {
  var vm = new Vue({
    el: '#burgers-list',
    data: {
      burgers : food
    }
  });
}

var deliveryDispatcher = new Vue({
  el: '#customer-info',
  data: {
    orders: {},
    orderInfo: []
  },
  methods: {
      addOrder: function () {
      this.orderInfo = placeOrder();
      socket.emit("addOrder", { details: { x: this.orders.details.x,
                                           y: this.orders.details.y },
                                orderItems: this.orderInfo[4],
                                personalInfo: [this.orderInfo[0],this.orderInfo[1],
                              this.orderInfo[2], this.orderInfo[3],]
                              });

    },
    // "displayOrder" which is triggered for click-events on the map
    displayOrder: function (event) {
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
      this.orders = { details: { x: event.clientX - 10 - offset.x,
                                 y: event.clientY - 10 - offset.y }
                    };
    }
  }
});



// Option 1: Populate info here in javascript and render HTML
// populateWebPageVue();

// Option 2: Use data from JSON and render HTML
loadInformationVue();
