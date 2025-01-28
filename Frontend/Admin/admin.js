const addForm = document.getElementById('addModal');
const url = 'http://127.0.0.1:8000/api/'
const carTable = document.getElementById('carTable');
const carCards = document.querySelector('.cards-container');
const rentTable = document.getElementById('rentTable');

window.onload = async () => {
    if (!localStorage.token) {
        window.location.href = "/Frontend/User/user.html";
    }
    let token = localStorage.getItem("token");
        let res = await axios.get(`${url}user/getUser/`, {
            headers: {
                "Authorization": `Token ${token}`
            }
        });
    if (!res.data.is_staff) {
        document.body.innerHTML = `<div class="error-message">You are not authorized to access this page.</div>`
    }
}

async function getData() {

    token = localStorage.getItem("token");
    let carData = await axios.get(`${url}car/`);
    let cars = carData.data;
    console.log(cars);
    displayCar(cars)

    let rentData = await axios.get(`${url}rent/allrent`,{headers:{"Authorization": `Token ${token}`}});
    let rentals = rentData.data;
    console.log(rentals);
    displayRental(rentals)
}

function displayCar(data) {
    carTable.innerHTML = '';

    carCards.innerHTML = '';

    data.forEach((car) => {
        carTable.innerHTML += `
                <tr>
                    <td><img src="http://127.0.0.1:8000/${car.pic}" alt="Car" class="car-image"></td>
                    <td>${car.model}</td>
                    <td>${car.name}</td>
                    <td>${car.year}</td>
                    <td>${car.color}</td>
                    <td>$${car.price}</td>
                    <td>
                        <button class="action-btn edit-btn">Edit</button>
                        <button class="action-btn delete-btn">Delete</button>
                    </td>
                </tr>
        `
    })
}

function displayRental(data) {
    rentTable.innerHTML = '';

    data.forEach((rental) => {
        rentTable.innerHTML += `
                <tr>
                    <td>${rental.car.name}</td>
                    <td>${rental.car.model}</td>
                    <td>${rental.user.username}</td>
                    <td>${rental.start_date}</td>
                    <td>${rental.end_date}</td>
                    <td>$${rental.car.price}</td> 
                    <td><button style = "background-color: #ef4444; color: white;" class="action-btn">Delete</button></td>   
                </tr>
        `
    })
}

getData();

addForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    let name = e.target[0].value;
    let model = e.target[1].value;
    let year = e.target[2].value;
    let color = e.target[3].value;
    let price = e.target[4].value;
    let pic = e.target[5].files[0];

    formData.append('name', name);
    formData.append('model', model);
    formData.append('year', year);
    formData.append('color', color);
    formData.append('price', price);
    formData.append('pic', pic);

    let res = axios.post(`${url}car/`, formData)
    console.log(res)
});





















function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Add event listeners
document.querySelector('.add-btn').addEventListener('click', () => openModal('addModal'));

document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal('editModal'));
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal').forEach(modal => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Form submissions
document.getElementById('addCarForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    closeModal('addModal');
});

document.getElementById('editCarForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    closeModal('editModal');
});