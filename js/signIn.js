import { auth } from "../js/firebaseConfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
let btn = document.getElementById("signInBtn");
btn.addEventListener("click", async (e) => {
    e.preventDefault();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let isLoading = false;
  if (!email || !password) {
    alert("please fill all field ");
    return;
  }
  try {
    isLoading = true;
    btn.textContent = "loading...";
    let signInData = await signInWithEmailAndPassword(auth, email, password);
    const user = signInData.user;
    email = "";
    password = "";
    setTimeout(() => {
      location.href = "../pages/homePage.html";
    }, 1000);
  } catch (error) {
    alert(error.message);
    return;
  } finally {
    isLoading = false;
    btn.textContent = "Sign In";
  }
});
