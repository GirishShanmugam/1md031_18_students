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

    // Add a checkbox to each menu item
    var cartDiv = document.createElement('div');
    cartDiv.setAttribute('class', 'cart-checkbox');
    var inputItem = document.createElement("input");
    inputItem.setAttribute('type', 'checkbox');
    inputItem.setAttribute('id', food[burger].name);
    inputItem.setAttribute('name', food[burger].name);
    inputItem.setAttribute('value', food[burger].name);
    cartDiv.appendChild(inputItem);
    var labelItem = document.createElement("label");
    labelItem.setAttribute('for', food[burger].name);
    labelItem.appendChild(document.createTextNode('Add to Order'));
    cartDiv.appendChild(labelItem);
    divClass.appendChild(cartDiv);
    burgersList.appendChild(divClass);
  }
}

/*A function that loads the information from the menu.js json object and
inserts the information to the burger selection section of the index.html file*/
function loadInformation() {
  populateWebPage(food);
}

/* A function that reads the values from your text fields, radio buttons and
drop-down menu and returns them in an array */
function placeOrder() {
  // Accessing text field input and selected values
  var fullName = document.getElementById("fullname").value;
  var emailId = document.getElementById("email").value;
  var paymentInfo = document.getElementById("payment").value;
  var radios = document.getElementsByName('gender');
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].type === 'radio' && radios[i].checked) {
        var genderValue = radios[i].value;
    }
  }
  /* check for all menu items if the checkbox is checked. If it is checked,
  the name of the burger belonging to the checkbox shall be added as well */
  var selectedBurgers = [];
  var menuItems = document.querySelectorAll("input[type=checkbox]");
  for (var i = 0; i < menuItems.length; i++) {
    if(menuItems[i].checked) {
      selectedBurgers.push(menuItems[i].name);
    }
  }
  return [fullName, emailId, paymentInfo, genderValue, selectedBurgers]
}

/* functionality for the order button that writes the information
to the bottom of the html file when the button is clicked */
function OrderConfirmation() {
  var orderDetails = placeOrder();
  var ordersInfo = document.getElementById("orders");
  var divClass = document.createElement('div');
  divClass.setAttribute('class', 'order-confirmation');

  var headlineItem = document.createElement("h2");
  var headlineValue = document.createTextNode("Order confirmation");
  headlineItem.appendChild(headlineValue);
  divClass.appendChild(headlineItem);

  var headlineItem = document.createElement("h3");
  var headlineValue = document.createTextNode("Customer details");
  headlineItem.appendChild(headlineValue);
  divClass.appendChild(headlineItem);

  var paragraphItem = document.createElement("p");
  paragraphItem.appendChild(document.createTextNode("Name: " + orderDetails[0]));
  paragraphItem.appendChild(document.createElement("br"));
  paragraphItem.appendChild(document.createTextNode("Email: " + orderDetails[1]));
  paragraphItem.appendChild(document.createElement("br"));
  paragraphItem.appendChild(document.createTextNode("Deliver To: " + orderDetails[3] + ", "+ orderDetails[2]));
  paragraphItem.appendChild(document.createElement("br"));
  paragraphItem.appendChild(document.createTextNode("Payment Method: " + orderDetails[4]));
  paragraphItem.appendChild(document.createElement("br"));
  paragraphItem.appendChild(document.createTextNode("Gender: " + orderDetails[5]));
  paragraphItem.appendChild(document.createElement("br"));
  divClass.appendChild(paragraphItem);

  var headlineItem = document.createElement("h3");
  headlineItem.appendChild(document.createTextNode("Order Summary"));
  divClass.appendChild(headlineItem);

  var unorderedList = document.createElement("ul");
  for (var i = 0; i < orderDetails[6].length; i++) {
    var listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(orderDetails[6][i]));
    unorderedList.appendChild(listItem);
  }
  divClass.appendChild(unorderedList);
  ordersInfo.appendChild(divClass);
}


/* A JavaScript event listener for your "order" button */
// Commented out event listener in JavaScript
// var myButton = document.getElementById("order-button");
// myButton.addEventListener("click", OrderConfirmation);


// Option 1: Populate info here in javascript and render HTML
// var foodInfo = createBurgerInfo()
// populateWebPage(foodInfo);

// Option 2: Use data from JSON and render HTML
// loadInformation();
