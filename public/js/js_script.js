/* menuItem has some properties, like the name of the product, the kCal and
if gluten and lactose are contained.  */
function MenuItem(name, kCal, hasGluten, hasLactose, image) {
  this.name = name;
  this.kCal = kCal;
  this.hasGluten = hasGluten;
  this.hasLactose = hasLactose;
  this.image =  image;
  this.menu = function() {
        var menuInfo = this.name + ', ' + this.kCal + 'kCal';
        if(hasGluten){
        	menuInfo = menuInfo + ', has gluten';
        }
        if(hasLactose){
        	menuInfo = menuInfo + ', has lactose';
        }
        return menuInfo;
    };
}

/* A function that defines at least five different burgers using the MenuItem
constructor and adds them to an array*/
function createBurgerInfo() {
  // An object constructor function "MenuItem"
  // Define five different burgers using the MenuItem constructor
  var item1 = new MenuItem('The Fire Burger', 750, true, true,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKCXIBqrFyAGQn_7aNAK4bMBzCLWenq-Y8bg&usqp=CAU");
  var item2 = new MenuItem('Fried Turkey Burger', 600, false, true,
  "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-qpc-deluxe-burger.jpg");
  var item3 = new MenuItem('A Double w/ Cheese', 1800, true, true,
  "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-Double-Quarter-Pounder-with-Cheese.jpg");
  var item4 = new MenuItem('Sous Vide Burger', 2500, false, false,
  "https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg");
  var item5 = new MenuItem('Mushroom-meat Blend', 1000, true, false,
  "https://www.thepacker.com/sites/default/files/sonic-slinger.jpg");
  // Add them to an array
  var food = [item1, item2, item3, item4, item5];
  return food;
}

/* A function that loops through the array and inserts the information
to the burger selection section of the index.html file */
function populateWebPage(food) {
  var burgersList = document.getElementById("burgers-list");
  // loop through the array
  for (var burger in food)
  {
    var divClass = document.createElement('div');
    divClass.setAttribute('class', 'menu-item');
    var headlineItem = document.createElement("h3");
    var headlineValue = document.createTextNode(food[burger].name);
    headlineItem.appendChild(headlineValue);
    divClass.appendChild(headlineItem);

    var figureItem = document.createElement("figure");
    var imageItem = document.createElement("img");
    imageItem.setAttribute('src', food[burger].image);
    figureItem.appendChild(imageItem);
    divClass.appendChild(figureItem);

    var unorderedList = document.createElement("ul");
    var listItem = document.createElement("li");
    var listValue = document.createTextNode(food[burger].kCal+ ' kCal');
    listItem.appendChild(listValue);
    unorderedList.appendChild(listItem);

    // Only displays allergy information if relevant(only if it contains lactose)
    if(food[burger].hasLactose) {
      var listItem = document.createElement("li");
      var listValue = document.createTextNode('Contains ');
      spanClass = document.createElement("span");
      spanClass.setAttribute('class', 'allergy');
      spanClass.appendChild(document.createTextNode('lactose'));
      listItem.appendChild(listValue);
      listItem.appendChild(spanClass);
      unorderedList.appendChild(listItem);
    }

    // Only displays allergy information if relevant(only if it contains gluten)
    if(food[burger].hasGluten) {
      var listItem = document.createElement("li");
      var listValue = document.createTextNode('Contains ');
      spanClass = document.createElement("span");
      spanClass.setAttribute('class', 'allergy');
      spanClass.appendChild(document.createTextNode('gluten'));
      listItem.appendChild(listValue);
      listItem.appendChild(spanClass);
      unorderedList.appendChild(listItem);
    }
    // insert the information to the burger selection section of the html file
    divClass.appendChild(unorderedList);
    burgersList.appendChild(divClass);
  }
}

/*A function that loads the information from the menu.js json object and
inserts the information to the burger selection section of the index.html file*/
function loadInformation() {
  populateWebPage(food);
}

// Option 1: Populate info here in javascript and render HTML
// var foodInfo = createBurgerInfo()
// populateWebPage(foodInfo);

// Option 2: Use data from JSON and render HTML
loadInformation();
