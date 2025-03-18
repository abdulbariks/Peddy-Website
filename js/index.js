const categories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const category = await response.json();
  showCategories(category.categories);
};
categories();
const showCategories = (categories) => {
  // console.log(categories);
  for (const category of categories) {
    // console.log(category);
    const allCategories = document.getElementById("all-categories");
    const div = document.createElement("div");

    div.innerHTML = `
        <div>       
           <button onclick="categoriesPets('${category.category}')"  class="bg-green-100 rounded-md cursor-pointer flex items-center gap-2 px-5 py-3 hover:bg-lime-700">${category.category}
           <img class="w-6" src="${category.category_icon}" alt="" />
           </button>
        </div>
    `;
    allCategories.appendChild(div);
  }
};

const categoriesPets = async (categoriespet) => {
  // console.log(categoriespet);

  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoriespet}`
  );
  const categoriesPet = await response.json();
  showCategoriesPets(categoriesPet.data);
};

const showCategoriesPets = (showCategoriesPets) => {
  // console.log(showCategoriesPets.length);
  const pets = document.getElementById("pets");
  const categoriesNotFound = document.getElementById("categories-not-found");
  const categoriesPets = document.getElementById("categories-pets");
  pets.innerHTML = "";
  categoriesNotFound.innerHTML = "";
  categoriesPets.innerHTML = "";
  if (showCategoriesPets.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = `
                  <div class="flex flex-col items-center justify-center">
                 <img
                    src="../images/error.webp"
                    alt="Shoes"
                    class="rounded-xl" />
                    <h2 class="text-4xl pt-5">No Found Pets</h2>
                  </div>

      `;
    categoriesNotFound.appendChild(div);
  }
  for (const showCategoriesPet of showCategoriesPets) {
    console.log(showCategoriesPet);
    const div = document.createElement("div");
    div.innerHTML = `
              <div class="card bg-base-100 w-96 shadow-sm">
              <figure class="px-10">
                  <img
                  src="${showCategoriesPet.image}"
                  alt="Shoes"
                  class="rounded-xl" />
              </figure>
              <div class="card-body items-center text-center">
                  <h2 class="card-title">${showCategoriesPet.pet_name}</h2>
                  <p class="line-clamp-2">${showCategoriesPet.pet_details}</p>
                  <div class="card-actions">
                  <button onclick="getPet('${showCategoriesPet.petId}')" class="btn btn-primary">Show Details</button>
                  </div>
              </div>
              </div>
      `;
    categoriesPets.appendChild(div);
  }
};

const getPet = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await response.json();
  const pet = data.petData;

  document.getElementById("my_modal_1").showModal();
  const showModal = document.getElementById("show-modal-detail");
  showModal.innerHTML = `
         <h3 class="text-lg font-bold">Pet Name: ${pet.pet_name}</h3>
        <p class="">Pet Details: ${pet.pet_details}</p>
         <div class="grid grid-cols-2 gap-3 py-3">
            <p class="">Country: ${pet.breed}</p>
            <p class="">Price: ${pet.price}/=</p>
            <p class="">Date of Birth: ${pet.date_of_birth}</p>
            <p class="">Gender: ${pet.gender}</p>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
  `;
};
