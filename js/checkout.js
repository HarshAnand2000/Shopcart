document.addEventListener("DOMContentLoaded", async () => {
  const sharedValue = localStorage.getItem("sharedValue");
  document.querySelector("#user").textContent = "Hi " + sharedValue;

  const accordian1 = document.getElementById("accordian1-heading");
  const accordianContent1 = document.getElementById("accordian-content1");
  const accordian2 = document.getElementById("accordian2-heading");
  const accordianContent2 = document.getElementById("accordian-content2");
  accordian1.addEventListener("click", () => {
    if (accordian1.classList.contains("bg-gray-300")) {
      accordian1.classList.remove("bg-gray-300");
      accordian1.classList.add("bg-blue-300");
      accordianContent1.classList.remove("hidden");
    } else {
      accordian1.classList.add("bg-gray-300");
      accordian1.classList.remove("bg-blue-300");
      accordianContent1.classList.add("hidden");
    }
  });

  accordian2.addEventListener("click", () => {
    if (accordian2.classList.contains("bg-gray-300")) {
      accordian2.classList.remove("bg-gray-300");
      accordian2.classList.add("bg-blue-300");
      accordianContent2.classList.remove("hidden");
    } else {
      accordian2.classList.add("bg-gray-300");
      accordian2.classList.remove("bg-blue-300");
      accordianContent2.classList.add("hidden");
    }
  });

  const queryParamsObject = getQueryParams();
  const cartId = queryParamsObject.cartId;

  const cart = await fetchCartById(cartId);
  const cartProducts = await cart.products;

  const cartProductsDownloadPromises = cartProducts.map(async (product) => {
    return {
      product: await fetchSingleProductById(product.productId),
      quantity: product.quantity,
    };
  });

  const products = await Promise.all(cartProductsDownloadPromises);
  removeLoader();

  //populating products highlight
  const productsAcoordian = document.querySelector("#productsAccordian");
  products.forEach((p) => {
    const imageDiv = document.createElement("div");
    const image = document.createElement("img");

    imageDiv.classList = "rounded-md";

    image.classList = "w-24 h-24 border-2 p-2 rounded-lg shadow-md";
    image.src = p.product.image;

    imageDiv.append(image);
    productsAcoordian.append(imageDiv);
  });

  //populating price
  const price = document.querySelector("#total");
  const discountedPrice = document.querySelector("#discount");
  const finalPrice = document.querySelector("#final-price");

  let total = 0;
  for (p of products) {
    total += p.product.price * p.quantity;
  }
  const discount = (total / 10).toFixed(2);
  const final = total - discount;
  price.textContent = total + "$";
  discountedPrice.textContent = discount + "$";
  finalPrice.textContent = final + "$";
});
