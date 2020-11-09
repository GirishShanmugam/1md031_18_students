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

var orders = new Vue({
    el: '#orders',
    data: {
      orderInfo: []
    },
    methods: {
      // functionality to the "Order" button
      markDone: function() {
          // Call the function in JavaScript from Vue code
          orderInfo = placeOrder();
          for (var i = 0; i < orderInfo.length; i++) {
            Vue.set(this.orderInfo, i, orderInfo[i]);
          }
        }
      }
});

// Option 1: Populate info here in javascript and render HTML
// populateWebPageVue();

// Option 2: Use data from JSON and render HTML
loadInformationVue();
