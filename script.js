document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("contentContainer").style.display = "block";
        document.getElementById("welcomeMessage").innerText = `Welcome ${user.displayName}`;
        displayClassContent(user);
      })
      .catch((error) => {
        document.getElementById("errorMessage").innerText = error.message;
      });
});

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        user.updateProfile({ displayName: username }).then(() => {
          document.getElementById("signupForm").style.display = "none";
          document.getElementById("contentContainer").style.display = "block";
          document.getElementById("welcomeMessage").innerText = `Welcome ${user.displayName}`;
          displayClassContent(user);
        });
      })
      .catch((error) => {
        document.getElementById("signupErrorMessage").innerText = error.message;
      });
});

function showSignUp() {
    document.querySelector(".login-container").style.display = "none";
    document.querySelector(".signup-container").style.display = "block";
}

function displayClassContent(user) {
    const classContent = document.getElementById("classContent");
    // Add code to display classes and subjects user teaches
    classContent.innerHTML = "<p>Class and subjects will be displayed here based on user data.</p>";
}
