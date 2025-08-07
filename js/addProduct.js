import { db } from "../js/firebaseConfig.js";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const nameInput = document.querySelector(
  "input[placeholder='enter product name']"
);
const descInput = document.querySelector(
  "input[placeholder='enter description for product']"
);
const priceInput = document.querySelector("input[placeholder='price']");
const categoryInput = document.getElementById("category");
const imageInput = document.getElementById("product-image");
const addButton = document.getElementById("add");
const clearButton = document.getElementById("clear-field");

function getImageBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

addButton.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const desc = descInput.value.trim();
  const price = parseFloat(priceInput.value.trim());
  const category = categoryInput.value;
  const imageFile = imageInput.files[0];

  if (!name || !desc || !price || !category || !imageFile) {
    alert("please fill all field !");
    return;
  }

  try {
    const imageBase64 = await getImageBase64(imageFile);
    const product = {
      name,
      description: desc,
      price: Number(price),
      category,
      image: imageBase64,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "products"), product);
    alert("Product added successfully!");
    function clearFields() {
      nameInput.value = "";
      descInput.value = "";
      priceInput.value = "";
      categoryInput.value = "all";
      imageInput.value = "";
    }
    clearButton.addEventListener("click", clearFields);
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Something went wrong while adding the product.");
  }
});
