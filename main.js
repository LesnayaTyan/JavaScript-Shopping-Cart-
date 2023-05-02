let carts = document.querySelectorAll(".add-cart");
let products = [
  {
    name: "Dziny",
    tag: "dziny",
    price: 600,
    inCart: 0,
  },
  {
    name: "Klobouk",
    tag: "klobouk",
    price: 300,
    inCart: 0,
  },
  {
    name: "Kosile",
    tag: "kosile",
    price: 1600,
    inCart: 0,
  },
  {
    name: "Bile kosile",
    tag: "kosile_bile",
    price: 450,
    inCart: 0,
  },
  {
    name: "Lnene kalhoty",
    tag: "lnene_kalhoty",
    price: 700,
    inCart: 0,
  },
  {
    name: "Lnene kalhoty",
    tag: "lnene_kalhoty_2",
    price: 550,
    inCart: 0,
  },
  {
    name: "Podprsenky",
    tag: "podprsenky",
    price: 350,
    inCart: 0,
  },
  {
    name: "Sako",
    tag: "sako",
    price: 950,
    inCart: 0,
  },
  {
    name: "Sandaly",
    tag: "sandaly",
    price: 590,
    inCart: 0,
  },
  {
    name: "Saty",
    tag: "saty",
    price: 1600,
    inCart: 0,
  },
  {
    name: "Top",
    tag: "top",
    price: 650,
    inCart: 0,
  },
  {
    name: "Top",
    tag: "top_2",
    price: 450,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

//Keeps numbers of clothes in cart (after refreshing page). We call it in the end of the script(for each page refreshing)

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

//Adding items

function cartNumbers(product) {
  //console.log("The product clicked is", product);
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }
  setItem(product);
}

function setItem(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  console.log("My cart cost is ", cartCost);

  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

//Cart Page

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products-container");
  let cartCost = localStorage.getItem("totalCost");
  //Just to see what inside console (JSON)
  console.log(cartItems);
  //

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="products">
        <ion-icon name="close-circle-outline"></ion-icon>
        <image src="./images/${item.tag}.jpeg" style="width:120px;height:120px">
        <span>${item.name}</span>
      </div>
      <div class="price">${item.price},00</div>
      <div class="quantity"><ion-icon name="caret-back-circle-outline"></ion-icon>
      <span>${item.inCart}</span>
      <ion-icon name="caret-forward-circle-outline"></ion-icon></div>
      <div class="total">
        CZK ${item.inCart * item.price}
      </div>
      `;
    });

    productContainer.innerHTML += `
      <div class="basketTotalContainer">
        <h4 class= "basketTotalTitle">Basket Total</h4>
        <h4 class="basketTotal">
        CZK ${cartCost},00</h4>
      </div>
    `;
  }
}

onLoadCartNumbers();
displayCart();
