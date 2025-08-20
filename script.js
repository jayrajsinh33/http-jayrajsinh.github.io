const form = document.getElementById("loginForm");
const msg = document.getElementById("message");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let user = document.getElementById("userid").value;
  let pass = document.getElementById("password").value;

  if (user === "jayrajsinh03" && pass === "dip-247") {
    msg.innerHTML = "<p class='success'>✅ Login Successful!</p>";
    // Redirect after login
    setTimeout(() => {
      window.location.href = "home.html"; // change to your page
    }, 1500);
  } else {
    msg.innerHTML = "<p class='error'>❌ Invalid User ID or Password</p>";
  }
});
