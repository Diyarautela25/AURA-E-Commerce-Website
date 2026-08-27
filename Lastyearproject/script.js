// ================= HERO BUTTON =================

const heroBtn = document.querySelector(".hero button");

if (heroBtn) {
   heroBtn.addEventListener("click", () => {
      alert("Welcome to AURA Store ✨");
   });
}



// ================= SEARCH BAR =================

const search = document.getElementById("search");
const products = document.querySelectorAll(".product");

if (search) {

   search.addEventListener("keyup", () => {

      let value = search.value.toLowerCase();

      products.forEach((product) => {

         let text = product.innerText.toLowerCase();

         if (text.includes(value)) {
            product.style.display = "block";
         }

         else {
            product.style.display = "none";
         }

      });

   });

}



// ================= CART SYSTEM =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {

   const cartCount = document.getElementById("cart-count");

   if (!cartCount) return;

   let totalItems = 0;

   cart.forEach(item => {
      totalItems += item.quantity;
   });

   cartCount.innerText = totalItems;
}

updateCartCount();

function attachCartEvents() {

   const cartBtns = document.querySelectorAll(".cart-btn");

   cartBtns.forEach((btn) => {

      if (btn.dataset.cartAttached) return;

      btn.dataset.cartAttached = "true";

      btn.addEventListener("click", () => {

         const product = btn.closest(".product");

         if (!product) return;

         const name = product.querySelector("h3").innerText;
         const price = product.querySelector("p").innerText;
         const image = product.querySelector("img").src;

         const existingItem =
         cart.find(item => item.name === name);

         if (existingItem) {

            existingItem.quantity++;

         } else {

            cart.push({
               name,
               price,
               image,
               quantity: 1
            });

         }

         localStorage.setItem(
            "cart",
            JSON.stringify(cart)
         );

         updateCartCount();

         btn.innerText = "Added ✓";

         setTimeout(() => {
            btn.innerText = "Add to Cart";
         }, 1000);

      });

   });

}

attachCartEvents();

// ================= CART PAGE =================

const cartItemsContainer =
document.getElementById("cart-items");

if(cartItemsContainer){

   function renderCart(){

      cartItemsContainer.innerHTML = "";

      let total = 0;

      cart.forEach((item,index)=>{

         const price =
         parseInt(item.price.replace("₹",""));

         total += price * item.quantity;

         cartItemsContainer.innerHTML += `
         <div class="card">

            <img src="${item.image}">

            <h3>${item.name}</h3>

            <p>${item.price}</p>

            <div class="quantity-box">

               <button onclick="decreaseQty(${index})">-</button>

               <span>${item.quantity}</span>

               <button onclick="increaseQty(${index})">+</button>

            </div>

            <button class="remove-btn"
            onclick="removeItem(${index})">
               Remove
            </button>

         </div>
         `;
      });

      document.querySelector(".total-price")
      .innerText = `Total: ₹${total}`;

      localStorage.setItem(
      "cart",
      JSON.stringify(cart));
   }

   window.increaseQty = function(index){

      cart[index].quantity++;

      renderCart();
      updateCartCount();
   }

   window.decreaseQty = function(index){

      if(cart[index].quantity > 1){

         cart[index].quantity--;

      }else{

         cart.splice(index,1);
      }

      renderCart();
      updateCartCount();
   }

   window.removeItem = function(index){

      cart.splice(index,1);

      renderCart();
      updateCartCount();
   }

   renderCart();
}

// ================= WISHLIST =================

const wishCount =
document.getElementById("wish-count");

let wishlist =
parseInt(localStorage.getItem("wishlistCount")) || 0;

if (wishCount) {
   wishCount.innerText = wishlist;
}

function attachWishEvents() {

   const wishButtons =
   document.querySelectorAll(".wish-btn");

   wishButtons.forEach((button) => {

      if (button.dataset.wishAttached) return;

      button.dataset.wishAttached = "true";

      button.addEventListener("click", () => {

         if (button.classList.contains("liked")) {

            wishlist--;

            if (wishlist < 0) wishlist = 0;

            button.classList.remove("liked");
            button.innerText = "♡";
            button.style.color = "black";

         } else {

            wishlist++;

            button.classList.add("liked");
            button.innerText = "♥";
            button.style.color = "red";
         }

         localStorage.setItem(
            "wishlistCount",
            wishlist
         );

         if (wishCount) {
            wishCount.innerText = wishlist;
         }

      });

   });

}

attachWishEvents();

// ================= PRODUCT POPUP =================

const popup = document.getElementById("product-popup");

const popupImg = document.getElementById("popup-img");

const popupTitle = document.getElementById("popup-title");

const popupPrice = document.getElementById("popup-price");

const popupDesc = document.querySelector(".popup-desc");

const closePopup = document.getElementById("close-popup");


function attachViewEvents(){

   const viewButtons =
   document.querySelectorAll(".view-btn");

   viewButtons.forEach((button) => {

      if(button.dataset.popupAttached)
      return;

      button.dataset.popupAttached =
      "true";

      button.addEventListener("click", () => {

         const card =
         button.closest(".product");

         const img =
         card.querySelector("img").src;

         const title =
         card.querySelector("h3").innerText;

         const price =
         card.querySelector("p").innerText;

         const desc =
         card.querySelector(".product-desc").innerText;

         popup.style.display = "flex";

         popupImg.src = img;

         popupTitle.innerText = title;

         popupPrice.innerText = price;

         popupDesc.innerText = desc;

      });

   });

}

attachViewEvents();


if (closePopup) {

   closePopup.addEventListener("click", () => {

      popup.style.display = "none";

   });

}

// ================= AUTH SYSTEM =================

document.addEventListener("DOMContentLoaded", () => {

   const loginBtn = document.getElementById("login-btn");
   const loginPopup = document.getElementById("login-popup");
   const closeLogin = document.getElementById("close-login");

   const signupPopup = document.getElementById("signup-popup");
   const showSignup = document.getElementById("show-signup");
   const closeSignup = document.getElementById("close-signup");

   const signupSubmit = document.getElementById("signup-submit");
   const loginSubmit = document.getElementById("login-submit");

   const userName = document.getElementById("user-name");
   const logoutBtn = document.getElementById("logout-btn");

   // ================= SHOW LOGIN =================
   loginBtn?.addEventListener("click", () => {
      loginPopup.style.display = "flex";
   });

   closeLogin?.addEventListener("click", () => {
      loginPopup.style.display = "none";
   });

   // ================= SHOW SIGNUP =================
   showSignup?.addEventListener("click", () => {
      loginPopup.style.display = "none";
      signupPopup.style.display = "flex";
   });

   closeSignup?.addEventListener("click", () => {
      signupPopup.style.display = "none";
   });

   // ================= SIGNUP =================
   signupSubmit?.addEventListener("click", () => {

      const name = document.getElementById("signup-name").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      if (!name || !email || !password) {
         alert("Please fill all fields");
         return;
      }

      const user = { name, email, password };
      localStorage.setItem("user", JSON.stringify(user));

      alert("Signup Successful ✅");

      signupPopup.style.display = "none";
      loginPopup.style.display = "flex";
   });

   // ================= LOGIN =================
   loginSubmit?.addEventListener("click", () => {

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (!savedUser) {
         alert("No user found. Please signup first.");
         return;
      }

      if (email === savedUser.email && password === savedUser.password) {

         alert("Login Successful ✅");

         loginPopup.style.display = "none";

         localStorage.setItem("loggedIn", "true");

         userName.innerText = `Hello, ${savedUser.name}`;

         loginBtn.style.display = "none";
         logoutBtn.style.display = "inline-block";

      } else {
         alert("Invalid email or password ❌");
      }
   });

   // ================= LOGOUT =================
   logoutBtn?.addEventListener("click", () => {

      localStorage.removeItem("loggedIn");

      userName.innerText = "";

      loginBtn.style.display = "inline-block";
      logoutBtn.style.display = "none";
   });

   // ================= AUTO LOGIN ON REFRESH =================
   const savedUser = JSON.parse(localStorage.getItem("user"));
   const isLoggedIn = localStorage.getItem("loggedIn");

   if (savedUser && isLoggedIn === "true") {
      userName.innerText = `Hello, ${savedUser.name}`;
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
   } else {
      logoutBtn.style.display = "none";
   }

});


// ================= COUNTDOWN =================

// FIRST TIME

if (!localStorage.getItem("endDate")) {

   let futureDate =
      new Date().getTime() + (24 * 60 * 60 * 1000);

   localStorage.setItem("endDate", futureDate);

}



let endDate = localStorage.getItem("endDate");



function updateCountdown() {

   let now = new Date().getTime();

   let distance = endDate - now;

   let days =
      Math.floor(distance / (1000 * 60 * 60 * 24));

   let hours =
      Math.floor(
         (distance % (1000 * 60 * 60 * 24))
         / (1000 * 60 * 60)
      );

   let minutes =
      Math.floor(
         (distance % (1000 * 60 * 60))
         / (1000 * 60)
      );

   let seconds =
      Math.floor(
         (distance % (1000 * 60))
         / 1000
      );

   const d = document.getElementById("days");

   const h = document.getElementById("hours");

   const m = document.getElementById("minutes");

   const s = document.getElementById("seconds");



   if (d) d.innerText = days;

   if (h) h.innerText = hours;

   if (m) m.innerText = minutes;

   if (s) s.innerText = seconds;



   // TIMER END

   if (distance < 0) {

      clearInterval(timer);

      const countdown =
         document.querySelector(".countdown");

      if (countdown) {

         countdown.innerHTML =
            "<h2>Sale Ended 🔥</h2>";

      }

      localStorage.removeItem("endDate");

   }

}



let timer = setInterval(updateCountdown, 1000);

updateCountdown();


// API PRODUCTS 

const apiContainer =
document.getElementById("api-products");

if (apiContainer) {

   Promise.all([

      fetch("https://fakestoreapi.com/products/category/men's clothing")
      .then(res => res.json()),

      fetch("https://fakestoreapi.com/products/category/women's clothing")
      .then(res => res.json())

   ])

   .then(([menProducts, womenProducts]) => {

      const allProducts = [
         ...menProducts,
         ...womenProducts
      ];

      allProducts.forEach(product => {

         apiContainer.innerHTML += `

         <div class="card product">

            <img src="${product.image}">

            <h3>${product.title}</h3>

            <p>₹${Math.floor(product.price * 85)}</p>

            <p class="product-desc">
               ${product.description}
            </p>

            <div class="btns">

               <button class="cart-btn">
                  Add to Cart
               </button>

               <button class="wish-btn">
                  ♡
               </button>

            </div>

            <button class="view-btn">
               View Details
            </button>

         </div>

         `;

      });

      attachCartEvents();
      attachWishEvents();
      attachViewEvents();

   })

   .catch(error => {

      console.error(
         "API Error:",
         error
      );

   });

}