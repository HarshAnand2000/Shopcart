document.addEventListener("DOMContentLoaded", async () => {
  const sharedValue = localStorage.getItem("sharedValue");
  document.querySelector("#user").textContent = "Hi " + sharedValue;

  async function fetchProducts() {
    const response = await axios.get("https://fakestoreapi.com/products/");
    const data = await response.data;
    return data;
  }

  async function fetchProductsByCatgeory(category) {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    const data = await response.data;
    return data;
  }

  async function fetchCategories() {
    const response = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    const data = await response.data;
    return data;
  }

  let allProducts = await fetchProducts();

  async function populateProducts(isFiltered, filteredProducts) {
    const queryParamsObject = getQueryParams(); //defined in common.js
    const category = queryParamsObject.category;

    //if category is present
    if (isFiltered == false) {
      if (category) {
        allProducts = await fetchProductsByCatgeory(category);
        document.getElementById("heading").textContent = `${category} products`;
      }
    }
    let products = allProducts;

    //if price filter is applied
    if (isFiltered == true) {
      products = filteredProducts;
    }

    const productsContainer = document.querySelector("#products");
    productsContainer.innerHTML = "";
    products.forEach((product) => {
      const productLink = document.createElement("a");
      productLink.classList =
        "border-2 border-bg-slate-100 basis-[22%] h-fit flex flex-col items-center py-2 shadow-md hover:shadow-2xl";
      productLink.href = `productDetails.html?id=${product.id}`;
      productLink.target = "_blank";

      const image = document.createElement("img");
      image.src = product.image;
      image.classList = "w-44 h-52 mb-4";
      productLink.append(image);

      const h3 = document.createElement("h3");
      h3.textContent = product.title.substring(0, 12) + "...";
      h3.classList = "text-xl text-center mb-1";
      productLink.append(h3);

      const h4 = document.createElement("h4");
      h4.textContent = `${product.price}$`;
      productLink.append(h4);

      productsContainer.append(productLink);
    });

    return;
  }

  async function populateCategoryFilters() {
    const categories = await fetchCategories();
    const categoryFilters = document.querySelector("#filtering-categories");
    categories.forEach((category) => {
      const categoryFilter = document.createElement("a");
      categoryFilter.textContent =
        category.charAt(0).toUpperCase() + category.slice(1);
      categoryFilter.href = `productList.html?category=${category}`;
      categoryFilter.classList =
        "bg-blue-100 hover:bg-blue-300 px-2 py-2 text-center border-b-2 border-black border-opacity-50";

      categoryFilters.append(categoryFilter);
    });
    return;
  }

  function downloadAndPopulate() {
    Promise.all([populateProducts(false), populateCategoryFilters()]).then(
      () => {
        //hiding the loader after data is fetched
        removeLoader();
      }
    );
  }

  downloadAndPopulate();

  function getProductsInPriceRange(minPrice, maxPrice, products) {
    return products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
  }

  function getSearchedProducts(products) {
    return products.filter((p) => {
      if (
        p.title.toLowerCase().includes(searchField.value.toLowerCase().trim())
      ) {
        return p;
      }
    });
  }

  //filtering products based on prices
  const searchBtn = document.querySelector("#search");
  searchBtn.addEventListener("click", async () => {
    const minPrice = Number(document.querySelector("#min-price").value);
    const maxPrice = Number(document.querySelector("#max-price").value);

    let searchedProducts = getSearchedProducts(allProducts);
    const priceFilteredProducts = getProductsInPriceRange(
      minPrice,
      maxPrice,
      searchedProducts
    );
    populateProducts(true, priceFilteredProducts);
  });

  //clearing filters
  const clearBtn = document.querySelector("#clear");
  clearBtn.addEventListener("click", () => {
    const productsContainer = document.querySelector("#products");
    productsContainer.innerHTML = "";
    document.querySelector("#min-price").value = 0;
    document.querySelector("#max-price").value = 0;
    window.location.search = "";
    populateProducts(false);
  });

  //searching products by name
  const searchField = document.querySelector("#searchfield");
  searchField.addEventListener("input", () => {
    //if price filter is applied
    const minPrice = Number(document.querySelector("#min-price").value);
    const maxPrice = Number(document.querySelector("#max-price").value);
    const priceFilteredProducts = getProductsInPriceRange(
      minPrice,
      maxPrice,
      allProducts
    );

    let searchedProducts = getSearchedProducts(priceFilteredProducts);

    populateProducts(true, searchedProducts);
  });
});
