const sharedValue = localStorage.getItem("sharedValue");
document.querySelector("#user").textContent = "Hi " + sharedValue;

async function fetchSingleProduct() {
  const queryParamsObject = getQueryParams();
  const productId = queryParamsObject.id;
  const product = fetchSingleProductById(productId);
  return product;
}

async function populateProduct() {
  const product = await fetchSingleProduct();
  removeLoader();

  const productWrapper = document.querySelector("#product-details-wrapper");

  const productImage = document.createElement("img");
  productImage.src = product.image;
  productImage.classList = "w-[24%] h-[24%]";
  productImage.alt = product.title;

  const productDetailsDiv = document.createElement("div");
  productDetailsDiv.classList = "flex flex-col";

  const h1 = document.createElement("h1");
  h1.textContent = product.title;
  h1.classList = "text-4xl font-semibold mb-6";

  const h3 = document.createElement("h3");
  h3.textContent = product.price + "$";
  h3.classList = "text-xl font-bold tracking-wider mb-2";

  const h5 = document.createElement("h5");
  h5.textContent = "Description";
  h5.classList = "text-sm text-stone-400 font-semibold";

  const p = document.createElement("p");
  p.textContent = product.description;

  const cartButtons = document.createElement("div");
  cartButtons.classList = "flex flex-col mt-6";
  const addToCart = document.createElement("a");
  addToCart.href = "";
  addToCart.textContent = "Add to Cart";
  addToCart.classList =
    "mb-4 bg-blue-500  py-2 w-[30%] text-center rounded-2xl";
  const goToCart = document.createElement("a");
  goToCart.href = "cart.html";
  goToCart.textContent = "Go to Cart";
  goToCart.classList = "bg-yellow-500 py-2 w-[30%] text-center rounded-2xl";

  cartButtons.append(addToCart);
  cartButtons.append(goToCart);

  productDetailsDiv.append(h1);
  productDetailsDiv.append(h3);
  productDetailsDiv.append(h5);
  productDetailsDiv.append(p);
  productDetailsDiv.append(cartButtons);

  productWrapper.append(productImage);
  productWrapper.append(productDetailsDiv);
}

populateProduct();
