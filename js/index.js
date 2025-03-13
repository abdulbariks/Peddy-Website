const categories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const category = await response.json();
  showCategories(category.categories);
};
categories();
const showCategories = (categories) => {
  console.log(categories);
  for (const category of categories) {
    console.log(category);
    const allCategories = document.getElementById("all-categories");
    const div = document.createElement("div");

    div.innerHTML = `
        <div>       
           <button onclick="categoriesPets('${category.category}')"  class="bg-green-100 rounded-md cursor-pointer flex items-center gap-2 px-5 py-3">${category.category}
           <img class="w-6" src="${category.category_icon}" alt="" />
           </button>
        </div>
    `;
    allCategories.appendChild(div);
  }
};

const categoriesPets = async (categoriespet) => {
  console.log(categoriespet);

  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoriespet}`
  );
  const categoriesPet = await response.json();
  showCategoriesPets(categoriesPet.data);
};

const showCategoriesPets = (showCategoriesPets) => {
  console.log(showCategoriesPets.length);
  if (showCategoriesPets.length < 1) {
    const categoriesNotFound = document.getElementById("categories-not-found");
    const div = document.createElement("div");

    div.innerHTML = `
                  <div class="flex flex-col items-center justify-center">
                 <img
                    src="../images/error.webp"
                    alt="Shoes"
                    class="rounded-xl" />
                    <h2>No Found Pets</h2>
                  </div>
      `;
    categoriesNotFound.appendChild(div);
  }
  for (const showCategoriesPet of showCategoriesPets) {
    console.log(showCategoriesPet);
    const categoriesPets = document.getElementById("categories-pets");
    const div = document.createElement("div");

    div.innerHTML = `
              <div class="card bg-base-100 w-96 shadow-sm">
              <figure class="px-10 pt-10">
                  <img
                  src="${showCategoriesPet.image}"
                  alt="Shoes"
                  class="rounded-xl" />
              </figure>
              <div class="card-body items-center text-center">
                  <h2 class="card-title">${showCategoriesPet.pet_name}</h2>
                  <p>${showCategoriesPet.pet_details}</p>
                  <div class="card-actions">
                  <button class="btn btn-primary">Show Details</button>
                  </div>
              </div>
              </div>
      `;
    categoriesPets.appendChild(div);
  }
};
