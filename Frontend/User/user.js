let signInForm = document.getElementById("SignInForm")
let signUpForm = document.getElementById("SignUpForm")

// Get all necessary DOM elements

const signUpButton = document.querySelector('section:first-child button:last-child');
const signInButton = document.querySelector('section:first-child button:first-child');

// Add click handlers for toggle buttons
signUpButton.addEventListener('click', () => {
    signInForm.style.display = 'none';
    signUpForm.style.display = 'flex';
    signUpButton.style.background = '#0056b3';
    signInButton.style.background = '#007bff';
});

signInButton.addEventListener('click', () => {
    signInForm.style.display = 'flex';
    signUpForm.style.display = 'none';
    signInButton.style.background = '#0056b3';
    signUpButton.style.background = '#007bff';
});

// Initialize the UI to show sign in form by default
window.addEventListener('load', () => {
    signInForm.style.display = 'flex';
    signUpForm.style.display = 'none';
    signInButton.style.background = '#0056b3';
});



//----------------------------- Api ------------------------------------


signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    let SignInData = {
        username: e.target[0].value,
        password: e.target[1].value,
    }
    let res = await axios.post("http://127.0.0.1:8000/api/user/login", SignInData);
    if (res.status == 401){
        alert("Invalid credentials")
    }
    if (res.status == 422){
        alert("wrong password")
    }
     
    // Store the token in local storage for future use
    localStorage.setItem("token", res.data.token);
    window.location.href = "/Frontend/Car/car.html";
    
})


signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let name = e.target[0].value
    let username = e.target[1].value
    let password = e.target[2].value
    let confirmPassword = e.target[3].value
    let phone = e.target[4].value
    let ProfilePic = e.target[5].files[0]
    if (password!= confirmPassword) {
        alert("Passwords do not match")
        return;
    }
    
    let signupData = new FormData();
    signupData.append('name', name);
    signupData.append('username', username);
    signupData.append('password', password);
    signupData.append('phone', phone);
    signupData.append('profile_pic', ProfilePic);

    console.log(signupData);
    let res = await axios.post("http://127.0.0.1:8000/api/user/", signupData);
    console.log(res.data);
    // Store the token in local storage for future use
    localStorage.setItem("token", res.data.token);
    if(res.data.is_staff){
        window.location.href = "/Frontend/Admin/admin.html";
    }
    else{
        window.location.href = "/Frontend/Car/car.html";
    }
})