const url = 'http://127.0.0.1:8000/api/';
const profileNav = document.querySelector('.profileNav');


window.onload = () => {
    if (!localStorage.token) {
        document.body.innerHTML = `<div class="error-message">sign in to you rental cars</div>
                                    <a href = '/frontend/user/user.html'>sign in</a>`
        return;
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
                <td><button onclick="updateRental(${rental.id})">Update</button></td>
                <td><button onclick="deleteRental(${rental.id})">Delete</button></td>
            </tr>`;
    });
}

async function deleteRental(id) {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`${url}rent/${id}/`, {
            headers: {
                "Authorization": `Token ${token}`
            }
        });
        alert("Rental deleted successfully!");
        getData(); // Refresh the data
    } catch (error) {
        console.error("Error deleting rental:", error);
    }
}

// Fetch and display data on page load
getData();
