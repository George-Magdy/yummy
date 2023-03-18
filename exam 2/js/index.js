

var meals = []
var mealsByLetter = []
var toggle = 0
var details = []
var ids = "52772"
var searchName = ""
var searchLetter = "s"
var Categories = []
var areas = []
var Ingredients = []
var mealName = "Seafood"
var mealArea = "Canadian"
var mealIngredients = "chicken_breast"


// navbar animations

$(".navIcon").click(() => {

  if (toggle == 0) {

    $(".nav1").animate({ left: '0' }, 400)
    $(".nav").animate({ left: '269px' }, 400)
    $(".navIcon").html(`<i class="fa-solid fa-xmark fs-1"></i>`)
    $(".p1").animate({ marginTop: '10px' }, 400)
    $(".p2").animate({ marginTop: '0px' }, 500)
    $(".p3").animate({ marginTop: '0px' }, 600)
    $(".p4").animate({ marginTop: '0px' }, 700)
    $(".p5").animate({ marginTop: '0px' }, 800)

    toggle = 1
  } else {
    closeNav()
  }


})

function closeNav() {

  $(".nav1").animate({ left: '-270px' }, 400)
  $(".nav").animate({ left: '0' }, 400)
  $(".navIcon").html(`<i class="fa-solid fa-bars fs-3"></i>`)
  $(".p1").animate({ marginTop: '1000px' }, 400)
  $(".p2").animate({ marginTop: '1000px' }, 500)
  $(".p3").animate({ marginTop: '1000px' }, 600)
  $(".p4").animate({ marginTop: '1000px' }, 700)
  $(".p5").animate({ marginTop: '1000px' }, 800)
  toggle = 0
}

// end of the navbar animations funciton

// get meals in main page

async function getMeals() {
  $(".load").removeClass("d-none")

  api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${searchLetter}=${searchName}`)
  var response = await api.json()
  meals = response.meals
  console.log(meals);

  $(".load").addClass("d-none")

}

function displayMeals() {


  var meal = ""

  for (let i = 0; i < meals.length; i++) {
    meal += `<div ids="${meals[i].idMeal}" class="col-xl-3 col-lg-4 col-md-6 rounded-3 pointer">

    <div ids="${meals[i].idMeal}" class="cards position-relative overflow-hidden p-0">

    
    <div ids="${meals[i].idMeal}" class="layer bg-gray w-100 h-100 position-absolute d-flex justify-content-start align-items-center rounded-3">
    <h2 ids="${meals[i].idMeal}" class="ms-2">${meals[i].strMeal}</h2>
    
    </div>
    <img ids="${meals[i].idMeal}" class="w-100 rounded-3" src="${meals[i].strMealThumb}" alt="">
    
    </div>
</div>`

  }
  document.getElementById("meals").innerHTML = meal


}

// end point of meal function

// get and display detalis id the meal

async function getDetiels() {
$(".load").removeClass("d-none")

  api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids}`)
  var response = await api.json()
  details = response.meals
  console.log(details);
  $(".load").addClass("d-none")
}
function displayDetiels() {

  var recipes = ""
  var tags;
  if (details[0].strTags != null) {
    tags = details[0].strTags.split(",")
  } else {
    tags = ""
  }

  var tag = ""

  document.querySelector(".mainDetails").innerHTML = `<img class="w-100" src="${details[0].strMealThumb}" alt="">
   <h2>${details[0].strMeal}</h2>`

  document.querySelector(".Instructions").innerHTML = ` <p>${details[0].strInstructions} </p>
   <h3>Area : ${details[0].strArea}</h3>
   <h3>Category : ${details[0].strCategory}</h3>`


  for (let i = 1; i < 20; i++) {
    if (details[0]["strIngredient" + i] == "") {

      recipes += ""
    } else {
      recipes += `<li class="bg-milky py-1 px-2 m-2 rounded-2">${details[0]["strMeasure" + i]} ${details[0]["strIngredient" + i]}</li>`
    }
  }
  document.querySelector(".recipes").innerHTML = recipes

  for (let i = 0; i < tags.length; i++) {

    tag += `<p class="bg-secondary py-1 px-2 m-2 rounded-2 d-inline">${tags[i]}</p>`

  }
  document.querySelector(".tags").innerHTML = tag

  document.querySelector(".btns").innerHTML = `<a href="${details[0].strSource}" Target=”_Blank”> <button class="btn btn-success">Source</button></a>
  <a href="${details[0].strYoutube}" Target=”_Blank”> <button class="btn btn-danger">YouTube</button></a>`


}

// end point of detalis function


// ------------------------------------------- start categories function ---------------------------------------------

// get categories

async function getCategories() {
  $(".load").removeClass("d-none")

  api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  var response = await api.json()
  Categories = response.categories
  console.log(Categories);



  var meal = ""

  for (let i = 0; i < Categories.length; i++) {
    meal += `<div Category="${Categories[i].strCategory}" ids="${Categories[i].idCategory}" class="col-xl-3 col-lg-4 col-md-6 rounded-3 pointer">

    <div Category="${Categories[i].strCategory}" ids="${Categories[i].idCategory}" class="cards position-relative overflow-hidden p-0">

    
    <div Category="${Categories[i].strCategory}" ids="${Categories[i].idCategory}" class="layer bg-gray w-100 h-100 position-absolute d-flex flex-column justify-content-start align-items-center rounded-3 p-3 text-center">
    <h2 Category="${Categories[i].strCategory}" ids="${Categories[i].idCategory}" class="ms-2">${Categories[i].strCategory}</h2>
    <p Category="${Categories[i].strCategory}" ids="${Categories[i].idCategory}">${Categories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div>
    <img Category="${Categories[i].strCategory}" ids="${Categories[i].idCategory}" class="w-100 rounded-3" src="${Categories[i].strCategoryThumb}" alt="">
    
    </div>
</div>`

  }
  document.getElementById("meals").innerHTML = meal

  $(".load").addClass("d-none")

  $(".cards").click((e) => {
    mealName = e.target.getAttribute("Category")
    console.log(mealName);

    getAllCat()



  })




}

$(".p2").click(() => {

  getCategories()
  $(".search").addClass("d-none")
  $("#contact").addClass("d-none")
  $("#meals").removeClass("d-none")
  $(".detiels").addClass("d-none")
  closeNav()

})

// filter by categories

async function FilterByCategory() {
  $(".load").removeClass("d-none")

  api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`)
  var response = await api.json()
  meals = response.meals
  console.log(meals);


  $(".load").addClass("d-none")

}

// get all functions of category to display it and display its detiels

async function getAllCat() {

  await FilterByCategory()
  await getDetiels()
  displayMeals()
  displayDetiels()

  $(".cards").click((e) => {
    ids = e.target.getAttribute("ids")
    $(".detiels").removeClass("d-none")
    $("#meals").addClass("d-none")
    $(".search").addClass("d-none")

    getAll2()

  })
  $(".exit").click(() => {
    $(".detiels").addClass("d-none")
    $("#meals").removeClass("d-none")

    getAll2()
  })




}

// --------------------------------------- end of categoris function -------------------------------------------


// ------------------------------------------- start areas function ---------------------------------------------

// get areas

async function getAreas() {
  $(".load").removeClass("d-none")

  api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  var response = await api.json()
  areas = response.meals
  console.log(areas);


  var meal = ""

  for (let i = 0; i < areas.length; i++) {
    meal += `<div class="col-xl-3 col-lg-4 col-md-6 rounded-3 pointer text-white text-center">

    <div area="${areas[i].strArea}" class="cards position-relative overflow-hidden p-0">
    <i  area="${areas[i].strArea}" class="fa-solid fa-earth-americas fs-10 text-white-50"></i>
    
    <h2  area="${areas[i].strArea}" class="ms-2">${areas[i].strArea}</h2>
    
    
    </div>
</div>`

  }
  document.getElementById("meals").innerHTML = meal

  $(".load").addClass("d-none")

  $(".cards").click((e) => {
    mealArea = e.target.getAttribute("area")
    console.log(mealArea);
    getAllAreas()
  })

}

$(".p3").click(() => {

  getAreas()
  $(".search").addClass("d-none")
  $("#contact").addClass("d-none")
  $("#meals").removeClass("d-none")
  $(".detiels").addClass("d-none")
  closeNav()

})

// filter by areas

async function FilterByArea() {
  $(".load").removeClass("d-none")

  api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealArea}`)
  var response = await api.json()
  meals = response.meals
  console.log(meals);
  $(".load").addClass("d-none")

}

// get all functions of area to display it and display its detiels

async function getAllAreas() {

  await FilterByArea()
  await getDetiels()
  displayMeals()
  displayDetiels()

  $(".cards").click((e) => {
    ids = e.target.getAttribute("ids")
    $(".detiels").removeClass("d-none")
    $("#meals").addClass("d-none")
    $(".search").addClass("d-none")

    getAll2()

  })
  $(".exit").click(() => {
    $(".detiels").addClass("d-none")
    $("#meals").removeClass("d-none")

    getAll2()
  })




}

// --------------------------------------- end of areas function -------------------------------------------



// ------------------------------------------- start Ingredients function ---------------------------------------------

// get Ingredients

async function getIngredients() {

  $(".load").removeClass("d-none")


  api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  var response = await api.json()
  Ingredients = response.meals
  console.log(Ingredients);


  var meal = ""

  for (let i = 0; i < Ingredients.length; i++) {
    
    meal += `<div class="col-xl-3 col-lg-4 col-md-6 rounded-3 pointer text-white text-center">

    <div Ingredients="${Ingredients[i].strIngredient}" class="cards position-relative overflow-hidden p-0">
    <i Ingredients="${Ingredients[i].strIngredient}" class="fa-solid fa-bowl-food fs-10 text-white-50"></i>
    
    <h2  Ingredients="${Ingredients[i].strIngredient}" class="ms-2">${Ingredients[i].strIngredient}</h2>
    <p Ingredients="${Ingredients[i].strIngredient}">${Ingredients[i].strDescription!=null? Ingredients[i].strDescription.split(" ").slice(0, 20).join(" ") : ""}</p>
    
    
    </div>
</div>`

  }
  document.getElementById("meals").innerHTML = meal

  $(".load").addClass("d-none")

  $(".cards").click((e) => {
    mealIngredients = e.target.getAttribute("Ingredients")
    console.log(mealIngredients);
    getAllIngredients()
  })

}

$(".p4").click(() => {

  getIngredients()
  $(".search").addClass("d-none")
  $("#contact").addClass("d-none")
  $("#meals").removeClass("d-none")
  $(".detiels").addClass("d-none")
  closeNav()

})

// filter by Ingredients

async function FilterByIngredients() {

  $(".load").removeClass("d-none")

  api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealIngredients}`)
  var response = await api.json()
  meals = response.meals
  console.log(meals);

  $(".load").addClass("d-none")

}

// get all functions of Ingredients to display it and display its detiels

async function getAllIngredients() {

  await FilterByIngredients()
  await getDetiels()
  displayMeals()
  displayDetiels()

  $(".cards").click((e) => {
    ids = e.target.getAttribute("ids")
    $(".detiels").removeClass("d-none")
    $("#meals").addClass("d-none")
    $(".search").addClass("d-none")

    getAll2()

  })
  $(".exit").click(() => {
    $(".detiels").addClass("d-none")
    $("#meals").removeClass("d-none")

    getAll2()
  })




}

// --------------------------------------- end of Ingredients function -------------------------------------------


async function getAll2() {

  await getDetiels()
  displayDetiels()

}



async function getAll() {

  await getMeals()
  await getDetiels()
  displayMeals()
  displayDetiels()

  $(".cards").click((e) => {
    ids = e.target.getAttribute("ids")
    $(".detiels").removeClass("d-none")
    $("#meals").addClass("d-none")
    $(".search").addClass("d-none")

    getAll2()

  })
  $(".exit").click(() => {
    $(".detiels").addClass("d-none")
    $("#meals").removeClass("d-none")

  })




}
getAll()



// ----------------------------------------- search functions -------------------------------------------

$(".p1").click(() => {
  $(".search").removeClass("d-none")
  $(".detiels").addClass("d-none")
  $("#meals").removeClass("d-none")
  $("#contact").addClass("d-none")
  closeNav()
})
// search by name

function search(index) {
  searchName = index
  console.log(searchName);
  searchLetter = "s"
  getAll()
}

// search my letter

function searchByletter(index) {
  searchName = index
  console.log(searchName);
  searchLetter = "f"
  getAll()
}

//---------------------------------------- end of search functions ---------------------------------------


$(".p5").click(() => {

  $(".search").addClass("d-none")
  $("#meals").addClass("d-none")
  $("#contact").removeClass("d-none")
  $(".detiels").addClass("d-none")
  closeNav()

})





const inputs = $('#contact input');

const passwordInput = $('#contact input').eq(4);
const repasswordInput = $('#contact input').eq(5);
const submitBtn = $('#contact button');


const nameRegex = /^.{3,}$/;
const emailRegex = /^.+@[a-zA-Z]+(\.[a-zA-Z]+)+$/;
const phoneRegex = /^(\+2)*01(1|0|2|5){1}[0-9]{8}$/;
const ageRegex = /^[1-9]{1}[0-9]{0,1}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

const regexMap = {
    'name' : nameRegex,
    'email' : emailRegex,
    'phone' : phoneRegex,
    'age' : ageRegex,
    'password' : passwordRegex,
}

function validHandler(elem)
{
    elem.removeClass('non-valid');
    elem.addClass('valid');
    elem.next().slideUp()
    elem.parent().children('i').eq(1).fadeOut()
    elem.parent().children('i').eq(0).fadeIn()
    $('#contact button').removeClass("disabled")
}

function nonValidHandler(elem)
{
    elem.removeClass('valid');
    elem.addClass('non-valid');
    elem.next().slideDown()
    elem.parent().children('i').eq(0).fadeOut()
    elem.parent().children('i').eq(1).fadeIn()
    $('#contact button').addClass("disabled")

}


inputs.on('input',(elem)=>
{
    const input = $(elem.target);

    if( input.attr('name') === 'repassword' || input.attr('name') === 'password' )
    {
        if( passwordInput.val() === repasswordInput.val() ){ console.log('in 1');  validHandler(repasswordInput);  }
        else{ console.log('in 2');  nonValidHandler(repasswordInput);  }
        if( input.attr('name') === 'repassword'){ return; }
    }

    if(regexMap[input.attr('name')].test(elem.target.value) ){   validHandler(input);  }
    else{   nonValidHandler(input);  }

});

submitBtn.on('click',function(){

    const checks = $('.fa-check');

    for (let i = 0; i < checks.length; i++) 
    {
        if( checks.eq(i).css('display') === 'none' ){
          
         }
    }


});




