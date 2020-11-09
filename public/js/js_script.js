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

// An object constructor function "MenuItem"
var item1 = new MenuItem('The Fire Burger', 750, true, true,
"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKCXIBqrFyAGQn_7aNAK4bMBzCLWenq-Y8bg&usqp=CAU");
var item2 = new MenuItem('Fried Turkey Burger', 600, false, true,
"https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-qpc-deluxe-burger.jpg");
var item3 = new MenuItem('A Double w/ Cheese', 1800, true, true,
"https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/items/regular/desktop/t-mcdonalds-Double-Quarter-Pounder-with-Cheese.jpg");

var burgersList = document.getElementById("burgers-list");

var burgers = [item1, item2, item3];
var burgerClass= ['burger1', 'burger2', 'burger3'];

for (var burger in burgers)
{
  var divClass = document.createElement('div');
  divClass.setAttribute('class', burgerClass[burger]);

  var headlineItem = document.createElement("h3");
  var headlineValue = document.createTextNode(burgers[burger].name);
  headlineItem.appendChild(headlineValue);
  divClass.appendChild(headlineItem);

  var figureItem = document.createElement("figure");
  var imageItem = document.createElement("img");
  imageItem.setAttribute('src', burgers[burger].image);
  figureItem.appendChild(imageItem);
  divClass.appendChild(figureItem);

  var unorderedList = document.createElement("ul");
  var listItem = document.createElement("li");
  var listValue = document.createTextNode(burgers[burger].kCal+ ' kCal');
  listItem.appendChild(listValue);
  unorderedList.appendChild(listItem);

  if(burgers[burger].hasLactose) {
    var listItem = document.createElement("li");
    var listValue = document.createTextNode('Contains ');
    spanClass = document.createElement("span");
    spanClass.setAttribute('class', 'allergy');
    spanClass.appendChild(document.createTextNode('lactose'));
    listItem.appendChild(listValue);
    listItem.appendChild(spanClass);
    unorderedList.appendChild(listItem);
  }

  if(burgers[burger].hasGluten) {
    var listItem = document.createElement("li");
    var listValue = document.createTextNode('Contains ');
    spanClass = document.createElement("span");
    spanClass.setAttribute('class', 'allergy');
    spanClass.appendChild(document.createTextNode('gluten'));
    listItem.appendChild(listValue);
    listItem.appendChild(spanClass);
    unorderedList.appendChild(listItem);
  }
  divClass.appendChild(unorderedList);
  burgersList.appendChild(divClass);

}
