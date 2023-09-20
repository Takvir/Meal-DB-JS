const allMeals = () => {
    const allUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php'
    fetch(allUrl)
        .then(res => res.json())
        .then(data => displayAll(data.categories))
}

allMeals()

const displayAll = (data)=>{
    const divFood = document.getElementById('allFood');

    data.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('food-img')
        div.innerHTML = `
        <figure><img src="${element.strCategoryThumb}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">
            ${element.strCategory}
            <div class="badge badge-secondary">NEW</div>
          </h2>
          <p>${element.strCategoryDescription.slice(0,300)}...</p>

        </div>`

        divFood.appendChild(div);
    });
}

const toggleSearchResult = displayStyle => {
  document.getElementById('meals').style.display = displayStyle;
  console.log('connected');
}


const onClickSearch = ()=>{
    const divFood = document.getElementById('allFood').style.display = 'none';
    // document.getElementById('searchFood').style.display = 'none';
    
    const input = document.getElementById('input-text')
    const inputText = input.value;
    const searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`
    fetch(searchUrl)
    .then(res => res.json())
    .then(data => searcItem(data.meals))

     

}

const searcItem = (data)=>{
  // toggleSearchResult('block')
    const divFood = document.getElementById('searchFood');

    data.forEach(element => {
      // document.getElementById('searchFood').style.display = 'block';
        const div = document.createElement('div');
        div.classList.add('food-img')
        div.innerHTML = `
        <div onclick="loadMealDetails(${element?.idMeal})">
        
        <figure><img src="${element.strMealThumb}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">
            ${element.strMeal}
            <div class="badge badge-secondary">NEW</div>
          </h2>
          <p>${element.strInstructions.slice(0,200)}...</p>

        </div>
        </div>`

        divFood.appendChild(div);

        console.log(element);
    });

    

}

const loadMealDetails = (mealID) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  fetch(url)
      .then(res => res.json())
      .then(data => displayMealDetails(data?.meals[0]))
}


const displayMealDetails = (meal) => {
  // console.log(meal);
  const mealDetails = document.getElementById('meal-Details');
  mealDetails.textContent = ''
  const div = document.createElement('div');
  div.classList.add('card')
  div.innerHTML = `
        <figure><img src="${meal.strMealThumb}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">
            ${meal.strMeal}
            <div class="badge badge-secondary">NEW</div>
          </h2>
          <p>${meal.strInstructions.slice(0,200)}...</p>

        </div>`

        mealDetails.appendChild(div);


}