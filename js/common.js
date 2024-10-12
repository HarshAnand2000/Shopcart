function getQueryParams() {
  const queryParams = new URLSearchParams(window.location.search);
  const queryParamsObject = Object.fromEntries(queryParams.entries());
  return queryParamsObject;
}

function removeLoader() {
  document.querySelector("body").classList = "";
  const loader = document.querySelector(".loader");
  loader.classList.add("hidden");
}

async function fetchSingleProductById(id) {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data;
}

async function fetchCartById(id) {
  const response = await axios.get(`https://fakestoreapi.com/carts/${id}`);
  const cart = response.data;
  return cart;
}
