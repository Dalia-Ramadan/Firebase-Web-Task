import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { auth } from "../js/firebaseConfig.js";
const userName = document.getElementById("username");
const userEmail = document.getElementById("email");
const userPass = document.getElementById("password");
const userConfirmPass = document.getElementById("confirmPassword");
const btn = document.getElementById("createBtn");
btn.addEventListener("click", async () => {
  let name = userName.value.trim();
  let email = userEmail.value.trim();
  let password = userPass.value.trim();
  let confirmPassword = userConfirmPass.value.trim();
  let isLoading = false;
  if (!name || !email || !password || !confirmPassword) {
    alert("please fill all field");
    return;
  } else if (confirmPassword !== password) {
    alert("password incorrect");
    return;
  }
  try {
    isLoading = true;
    btn.textContent = "loading......";
    let data = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(data.user, {
      displayName: name,
    });
    userName.value = "";
    userEmail.value = "";
    userPass.value = "";
    userConfirmPass.value = "";
    setTimeout(() => (location.href = "../pages/homePage.html"), 1000);
  } catch (error) {
    alert(error.message);
    return
  }finally{
    isLoading = false;
    btn.textContent = "create account"
  }
});
