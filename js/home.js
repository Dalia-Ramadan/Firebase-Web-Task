import { auth, db } from "../js/firebaseConfig.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const currentUserEl = document.getElementById("currentUser");
const logoutBtn = document.querySelector("a[href='../pages/signInPage.html']");
const productList = document.getElementById("productList");

const categorySelect = document.getElementById("category");
const priceSelect = document.getElementById("price");
const orderBySelect = document.getElementById("orderBy");

let products = [];
let currentFilters = {
  category: "all",
  price: "all",
  order: "all",
};

categorySelect.addEventListener("change", () => {
  currentFilters.category = categorySelect.value;
  renderProducts();
});
priceSelect.addEventListener("change", () => {
  currentFilters.price = priceSelect.value;
  renderProducts();
});
orderBySelect.addEventListener("change", () => {
  currentFilters.order = orderBySelect.value;
  renderProducts();
});

function renderProducts() {
  let filtered = [...products];

  if (currentFilters.category !== "all") {
    filtered = filtered.filter((p) => p.category === currentFilters.category);
  }

  if (currentFilters.price !== "all") {
    filtered = filtered.filter((p) => {
      const price = Number(p.price);
      switch (currentFilters.price) {
        case "less-than":
          return price < 50;
        case "50$-100$":
          return price >= 50 && price <= 100;
        case "100$-200$":
          return price > 100 && price <= 200;
        case "more-than":
          return price > 200;
        default:
          return true;
      }
    });
  }

  if (currentFilters.order === "priceHigh") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentFilters.order === "priceLow") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentFilters.order === "Oldest-first") {
    filtered.sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds);
  } else if (currentFilters.order === "Newest-first") {
    filtered.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
  }

  productList.innerHTML = "";
  if (filtered.length === 0) {
    productList.innerHTML = `<p>No products found</p>`;
    return;
  }

  filtered.forEach((item) => {
    productList.innerHTML += `
      <div class="product-card">
        <div class="product-image">
          ${
            item.image
              ? `<img src="${item.image}" alt="Product Image" style="width: 100%; height: 150px; object-fit: cover;">`
              : '<i class="fas fa-image"></i>'
          }
        </div>
        <div class="product-content">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="product-footer">
            <span>$${item.price}</span> | 
            <span>${item.category}</span>
          </div>
        </div>
      </div>
    `;
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    const name = user.displayName || "User";
    currentUserEl.textContent = `${name}`;
  } else {
    alert("Please sign in first.");
    window.location.href = "../pages/signInPage.html";
  }
});

const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
onSnapshot(q, (snapshot) => {
  products = [];
  snapshot.forEach((doc) => {
    products.push(doc.data());
  });
  renderProducts();
});

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth).then(() => {
    window.location.href = "../pages/signInPage.html";
  });
});
