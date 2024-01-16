const products = [
  {
    img: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "SHOES",
    price: 25,
    id: "1",
  },
  {
    img: "https://images.pexels.com/photos/3649765/pexels-photo-3649765.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "MEN's T-SHIRT",
    price: 26,
    id: "2",
  },
  {
    img: "https://i.pinimg.com/originals/24/23/d7/2423d7adb3456b95d3b08752b668dbbf.jpg",
    name: "JEANS",
    price: 25,
    id: "3",
  },
  {
    img: "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "WATCH",
    price: 90,
    id: "4",
  },
  {
    img: "https://images.pexels.com/photos/6858618/pexels-photo-6858618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "SMART PHONE",
    price: 110,
    id: "5",
  },
  {
    img: "https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "TELEVISION",
    price: 300,
    id: "6",
  },
  {
    img: "https://images.pexels.com/photos/4295985/pexels-photo-4295985.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "HOODIES",
    price: 15,
    id: "7",
  },
  {
    img: "https://media.istockphoto.com/photos/vintage-plates-with-silver-teaspoons-picture-id184363070",
    name: "DINNER SET",
    price: 10,
    id: "8",
  },
  {
    img: "https://images.pexels.com/photos/6463348/pexels-photo-6463348.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "BLANKETS",
    price: 9.9,
    id: "9",
  },
  {
    img: "/images/laptop.jpeg",
    name: "LAPTOP",
    price: 99,
    id: "10",
  },
  {
    img: "https://media.istockphoto.com/photos/black-coffee-maker-with-green-led-lights-picture-id177395430",
    name: "COFFEE MAKER",
    price: 29.7,
    id: "11",
  },
  {
    img: "https://images.pexels.com/photos/6606354/pexels-photo-6606354.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    name: "BED",
    price: 100,
    id: "12",
  },
  {
    img: "https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "BOOK",
    price: 9,
    id: "13",
  },
  {
    img: "https://images.pexels.com/photos/4339598/pexels-photo-4339598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    name: "BAG",
    price: 36.5,
    id: "14",
  },
];


const cartArray = [];
const cartItem = document.querySelectorAll(".cart");
function addCart(element) {
    element.addEventListener("click", function () {
      const productId = element.dataset.productId;
      const selectedProduct = products.find(
        (product) => product.id === productId
      );
  
      cartArray.push(selectedProduct);
  
      console.log("Added to cart:", selectedProduct);
      populateProductsCart(cartArray); 
      showAddedToCartMessage(selectedProduct.name);
    });
  }
  
  cartItem.forEach(addCart);

const openCheckout = document.querySelector(".cartmenu");
const showCartTrigger = document.querySelector(".checkout");

function showCart() {
  openCheckout.classList.remove("hidden");
}

showCartTrigger.addEventListener("click", showCart);

const closeCheckout = document.querySelector(".cartmenu .closeCart");
function hideCart() {
  openCheckout.classList.add("hidden");
}
closeCheckout.addEventListener("click", hideCart);

function createHTMLProductCart(cartItem) {
  let cardHTML = `
      <div class="card w-52 shadow-md">
        <div class="img-wrapper border h-52 w-52 overflow-hidden">
          <img class="h-full max-w-none" src="${cartItem.img}" alt="" />
        </div>
        <div class="card-details p-2">
          <div class="flex justify-between items-center">
            <h3 class="product-name">${cartItem.name}</h3>
  
  
            <i onclick="removeProductFromCart('${cartItem.id}')" class="far fa-times-circle cursor-pointer"></i>
  
            
          </div>
          <div class="flex justify-between">
            <div class="price">$${cartItem.price}</div>
            
          </div>
        </div>
      </div>
    `;
  return cardHTML;
}

let cartsGrid = document.querySelector(".cartObjects");
function populateProductsCart(cartArray) {
  cartsGrid.innerHTML = "";
  cartArray.forEach(function (cartItem) {
    let cardHTML = createHTMLProductCart(cartItem);
    cartsGrid.innerHTML += cardHTML;
  });

  const cartTotalElement = document.getElementById("cartTotal");
  const total = calculateCartTotal(cartArray);
  cartTotalElement.textContent = total.toFixed(2);
}

populateProductsCart(cartArray);
let targetIndex = products.findIndex((product) => product.id === product);
function removeProductFromCart(productId) {
  const selectedIndex = cartArray.findIndex(
    (product) => product.id === productId
  );

  if (selectedIndex !== -1) {
    const removedProduct = cartArray.splice(selectedIndex, 1)[0];
    console.log("Product removed from cart:", removedProduct);
    populateProductsCart(cartArray); 
  } else {
    console.log("Product not found in cart");
  }
}

function calculateCartTotal(cartArray) {
  return cartArray.reduce((total, product) => total + product.price, 0);
}

function showAddedToCartMessage(productName) {
  const addedToCartMessage = document.getElementById("addedToCartMessage");
  addedToCartMessage.textContent = `${productName} added to cart`;
  addedToCartMessage.classList.add("show");

  setTimeout(() => {
    addedToCartMessage.textContent = "";
    addedToCartMessage.classList.remove("show");
  }, 2000);
}

function removeAllProducts() {
  cartArray.length = 0;
  populateProductsCart(cartArray);
}
