let btn = document.querySelector(".btn");
let box = document.querySelector("input");
let con = document.querySelector(".recipe-con");

let closebtn = document.querySelector('.closebtn');

let content = document.querySelector('.content')


let boxDetail = document.querySelector('.details');



const fetchrecipe = async (choice) => {
    con.innerHTML = "Fetching Recipes.....";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${choice}`);
    const res = await data.json();

    // console.log(res.meals);
    con.innerHTML = "";
    if (res.meals) {
        res.meals.forEach(meal => {
            // console.log(meal.strYoutube);

            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            recipeDiv.innerHTML = `<img src="${meal.strMealThumb}"/>
         <h3>${meal.strMeal}</h3>
         <p><span>${meal.strArea}</span> Dish</p>
          <p>Belongs to <span>${meal.strCategory}</span> Category</p>`;

            let button = document.createElement('button');
            button.textContent = 'Show Recipe';


            con.appendChild(recipeDiv);
            recipeDiv.appendChild(button);

            button.addEventListener("click", (e) => {
                openRecipe(meal);
            })

        })
    }
    else {
        con.innerHTML = `<h1>Recipe Not Found Or Internet problem</h1>`;
    }
}

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const serchIn = box.value.trim();
    fetchrecipe(serchIn);

})

const recipeDetails = (meal) => {
    let material = "";
    for (let i = 1; i <= 20; i++) {
        const mat = meal[`strIngredient${i}`];
        if (mat) {
            const measure = meal[`strMeasure${i}`];
            // const link=meal[`strYoutube${i}`];


            material += `<li>${measure}  ${mat}</li>
            
                `
                ;
        }
        else {
            break;
        }

    }
    return material;

}

const openRecipe = (meal) => {
    // console.log(meal.strYoutube)
    content.innerHTML = `<h2>${meal.strMeal}</h2>
     <p><span>${meal.strArea}</span> Dish</p>
   <p><a href=${meal.strYoutube}>Youtube Link</a></p>
          <p>Belongs to <span>${meal.strCategory}</span> Category</p>
          <h2>Ingredients:</h2>
          <ul>${recipeDetails(meal)}</ul>
          <div>
    <h3>
     Instructions:
    </h3>
    <p>${meal.strInstructions}</p>
</div>
          `;



    content.parentElement.style.display = "block";

}

closebtn.addEventListener('click', () => {
    boxDetail.style.display = "none";
    //   console.log('clicked')
})




