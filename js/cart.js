document.addEventListener("DOMContentLoaded", async () => {
  const sharedValue = localStorage.getItem("sharedValue");
  document.querySelector("#user").textContent = "Hi " + sharedValue;

  let cartId = Math.floor(Math.random() * 7 + 1);

  function prepareWrapperDivForCartItems(products) {
    products.forEach((fetchedProduct) => {
      let product = fetchedProduct.product;
      let quantity = fetchedProduct.quantity;

      const ordersWrapper = document.getElementById("order-details");

      const cartProduct = document.createElement("div");
      cartProduct.classList =
        "cartProduct border-b-2 border-bg-slate-400 pb-4 mt-4";

      const cartProductInner = document.createElement("div");
      cartProductInner.classList = "flex justify-between items-center";

      const cartProductInnerLeft = document.createElement("div");
      cartProductInnerLeft.classList = "flex gap-4 w-[100%]";

      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.classList = "w-[20%]";

      const productDetails = document.createElement("div");
      productDetails.classList = "my-auto";

      const productTitle = document.createElement("h4");
      productTitle.textContent = product.title;
      productTitle.classList = "text-lg mb-1";

      const productPrice = document.createElement("p");
      productPrice.textContent = product.price + "$";
      productPrice.classList = "text-md";

      productDetails.append(productTitle);
      productDetails.append(productPrice);

      cartProductInnerLeft.append(productImage);
      cartProductInnerLeft.append(productDetails);

      const cartProductInnerRight = document.createElement("div");
      cartProductInnerRight.classList = "basis-[25%] flex flex-col gap-4";

      const qHeading = document.createElement("h5");
      qHeading.textContent = "Quantity";

      const select = document.createElement("select");
      select.classList = "p-2 border-2 border-bg-slate-400 rounded-md";
      select.name = "prices";

      for (let i = 1; i <= 10; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        if (i == quantity) {
          option.selected = true;
        }
        select.append(option);
      }

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList = "bg-red-600 text-white py-2 rounded-md";

      cartProductInnerRight.append(qHeading);
      cartProductInnerRight.append(select);
      cartProductInnerRight.append(removeBtn);

      cartProductInner.append(cartProductInnerLeft);
      cartProductInner.append(cartProductInnerRight);

      cartProduct.append(cartProductInner);

      ordersWrapper.append(cartProduct);
    });
  }

  async function populateCart() {
    const cart = await fetchCartById(cartId);
    const cartProducts = cart.products;

    let cartProductsDownloadPromises = cartProducts.map(async (p) => {
      return {
        product: await fetchSingleProductById(p.productId),
        quantity: p.quantity,
      };
    });

    let products = await Promise.all(cartProductsDownloadPromises);
    removeLoader();

    //populating order details
    prepareWrapperDivForCartItems(products);

    //populating pricing details
    let total = 0;
    for (p of products) {
      total += p.product.price * p.quantity;
    }
    const discount = (total / 10).toFixed(2);
    const discountedTotal = total - discount;

    document.getElementById("total").textContent = total + "$";
    document.getElementById("discount").textContent = discount + "$";
    document.getElementById("discountedTotal").textContent =
      discountedTotal + "$";
  }

  populateCart();

  const checkoutBtn = document.querySelector(".checkout");
  checkoutBtn.href = `checkout.html?cartId=${cartId}`;
});
