const url = 'http://127.0.0.1:8000/api/';
const profileNav = document.querySelector('.profileNav');


window.onload = () => {
    if (!localStorage.token) {
        window.location.href = "/Frontend/User/user.html";
    }

    profileNav.innerHTML = `Profile`
    profileNav.href = '/Frontend/Profile/Profile.html'
}



async function getData() {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${url}rent/`, {
            headers: {
                "Authorization": `Token ${token}`
            }
        });

        // Log and display data
        console.log(res.data);
        display(res.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function display(rentals) {
    const rentTableBody = document.getElementById("RentTable");
    rentTableBody.innerHTML = ""; // Clear table before adding new data

    rentals.forEach(rental => {
        rentTableBody.innerHTML += `
            <tr>
            <td>${rental.car.name}</td>
                <td>${rental.car.model}</td>
                <td>${rental.user.username}</td>
                <td>${rental.start_date}</td>
                <td>${rental.end_date}</td>
                <td>$${rental.car.price}</td>
                <td><button id="updateRental(${rental.id})">Update</button></td>
                <td><button dataId="${data.id}" class="delete-btn">Delete</button></td>
            </tr>`;
    });
    let deleteButtons = document.querySelectorAll('.delete-btn');
    console.log(deleteButtons)

    deleteButtons.forEach((button) => {
        button.addEventListener('click',(e) =>{
            delete(e)
        });
    });

}

async function delet(e) {
    let id = e.target.getAttribute('dataId');
    let token = localStorage.getItem('token');
    let res = await axios.delete(`${url}rent/${id}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
    console.log(res.data);
    getData();
}

// Fetch and display data on page load
getData();
