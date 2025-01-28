const profilePic = document.querySelector('.profile-pic');
const profileUsername = document.querySelector('.profile-username');
const profileName = document.querySelector('.profile-name');
const Username = document.querySelector('.username');
const Name = document.querySelector('.name');
const Phone = document.querySelector('.phone');
const Date = document.querySelector('.date');
const profileNav = document.querySelector('.profileNav');

const url = 'http://127.0.0.1:8000/api/'


window.onload = () => {
    if (!localStorage.token) {
        window.location.href = "/Frontend/User/user.html";
    }

    profileNav.innerHTML = `Profile`
    profileNav.href = '/Frontend/Profile/Profile.html'
}

async function getUser(){
    let token = localStorage.getItem("token");
    let data = await axios.get(`${url}user/getUser/`, {
        headers: {
            "Authorization": `Token ${token}`
        }
    })
    display(data.data)
}

function display(data){
    profilePic.src = `http://127.0.0.1:8000${data.profile.profile_pic}`;
    profileUsername.innerHTML = data.username;
    profileName.innerHTML = data.profile.name
    Username.innerHTML = data.username;
    Name.innerHTML = data.profile.name;
    Phone.innerHTML = data.profile.phone;
    Date.innerHTML = data.date_joined.split('T')[0];
}

getUser();


function logout(){
    localStorage.removeItem("token");
    window.location.href = "/Frontend/User/user.html";  
}