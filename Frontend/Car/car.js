const url = 'http://127.0.0.1:8000/api/'
const adminBtn = document.querySelector(".adminBtn");
const profileNav = document.querySelector(".profileNav");

window.onload = async function() {
    console.log(localStorage)
    if(!localStorage.token)
    {
        window.location.href = "/Frontend/User/user.html";
    }
    let token = localStorage.getItem("token");
        let res = await axios.get(`${url}user/getUser/`, {
            headers: {
                "Authorization": `Token ${token}`
            }
        });
    if (!res.data.is_staff) {
        adminBtn.classList.add('none')
    }

    profileNav.innerHTML = `Profile`
    profileNav.href = '/Frontend/Profile/Profile.html'

  };

async  function getData() 
{
    let data = await axios.get(`${url}car/`);
    console.log(data.data)
    display(data.data)
}

function display(cars){
    let container = document.querySelector(".container")
    container.innerHTML = ""
    cars.forEach((data) => {
        container.innerHTML += `
        <div class="car-card">
        <img src="http://127.0.0.1:8000${data.pic}" alt="Car Image">
        <h2>${data.name}</h2>
        <p>Model: ${data.model}</p>
        <p>Year: ${data.year}</p>
        <p>Color: ${data.color}</p>
        <p>Price: $${data.price}</p>
        <button dataId="${data.id}" class="book-btn">Book Now</button>
    </div>`})

    let button = document.querySelectorAll(".book-btn");
    console.log(button)

    button.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            rent(e);
        })
    })

}

    
        

async function rent(e) {
    let ID = e.target.getAttribute("dataId");
    console.log(ID)

    let token = localStorage.getItem("token");

    let res = await axios.post(`${url}rent/`, {car: ID, end_date: "2023-01-01"}, {
        headers: {
            "Authorization": `Token ${token}`
        }
    });
    console.log(res.data)
}
getData()