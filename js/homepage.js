const keyAutorizzazione =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWFhNzc5YzQ1ZjAwMTU2OWI0YjUiLCJpYXQiOjE3Mjc0MjEwOTUsImV4cCI6MTcyODYzMDY5NX0._4gi8zkpd_oEk87bmSbyP1pkqeJw_WP-lQr0-ENm9eQ";
const apiLink = "https://striveschool-api.herokuapp.com/api/product/";

const getCar = function () {
  fetch(apiLink, {
    headers: { Authorization: keyAutorizzazione },
  })
    .then((response) => {
      console.log("RESPONSE", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella risposta del server");
      }
    })
    .then((arrayCar) => {
      arrayCar.forEach((car) => {
        console.log(car);

        const row = document.querySelector(".row");
        const colonnaCar = document.createElement("div");
        colonnaCar.classList.add("col", "col-12", "col-md-4", "col-lg-3");

        colonnaCar.innerHTML = `
  <div class="card h-100 shadow rounded-1">
    <img src="${car.imageUrl}" class="card-img-top" alt="car">
    <div class="card-body d-flex flex-column bg-dark">
      <h5 class="card-title text-light ms-2 mt-2">${car.name}</h5>
      <p class="card-text text-light flex-grow-1 ms-2">${car.description}</p>
      <p class="card-text text-light ms-2">${car.brand} - ${car.price}€</p>
      <a href="./detail.html?carId=${car._id}" class="btn buttonDetail mt-auto rounded-0">VAI AI DETTAGLI</a>
    </div>
  </div>
`;

        row.appendChild(colonnaCar);
      });
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};

getCar();
