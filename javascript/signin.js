// Simulated admin credentials
const adminCredentials = {
    email: "l@example.com",  // dummy email
    password: "lebron"   // dummy password
};

// Function to handle sign-in
function handleSignIn(event) {
    event.preventDefault(); 
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
if (email === adminCredentials.email && password === adminCredentials.password) {
       
        localStorage.setItem("isAdmin", "true");
        alert("Sign-in successful!");
        
        // Redirect to the objective page
        window.location.href = "objective.html";
    } else {
        alert("Invalid credentials. Please try again.");
    }
}
document.getElementById("signInForm").addEventListener("submit", handleSignIn);