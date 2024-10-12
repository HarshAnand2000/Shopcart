"use strict";

const user = getQueryParams();
localStorage.setItem("sharedValue", user.username); // Use sessionStorage if it's session-specific
const sharedValue = localStorage.getItem("sharedValue");
document.querySelector("#user").textContent = "Hi " + sharedValue;

async function fetchCategories() {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const data = await response.json(); //respone.json parses the response as JSON, which returns another Promise that resolves to the parsed data.
  return data;
}

async function populateCategories() {
  const response = await fetchCategories();

  //hiding the loader after data is fetched
  removeLoader();

  const categories = document.querySelector(".categories");

  response.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList =
      "flex justify-center items-center w-40 h-24 rounded-lg bg-stone-500 text-lg border-2 border-stone-600 shadow-md shadow-stone-700 text-white hover:bg-stone-700 hover:cursor-pointer";
    const categoryLink = document.createElement("a");
    categoryLink.textContent =
      category.charAt(0).toUpperCase() + category.slice(1);
    categoryLink.href = `productList.html?category=${category}`;
    categoryDiv.append(categoryLink);
    categories.append(categoryDiv);
  });
}

populateCategories();
