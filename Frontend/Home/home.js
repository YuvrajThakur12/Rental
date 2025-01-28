const profileNav = document.querySelector('.profileNav')

window.onload = () => {
    if (localStorage.token) {
        profileNav.innerHTML = `Profile`
        profileNav.href = '/Frontend/Profile/Profile.html'
    }

    
}