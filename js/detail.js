const keyAutorizzazione =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWFhNzc5YzQ1ZjAwMTU2OWI0YjUiLCJpYXQiOjE3Mjc0MjEwOTUsImV4cCI6MTcyODYzMDY5NX0._4gi8zkpd_oEk87bmSbyP1pkqeJw_WP-lQr0-ENm9eQ";
const apiLink = "https://striveschool-api.herokuapp.com/api/product/";

const contenutoBarraUrl = new URLSearchParams(location.search); //prendo il contenuto della barra d'indirizzo
const carId = contenutoBarraUrl.get("carId"); //ci aggiungo l'id della card che ho messo nella homepage (?carId=) nel button della card

const carInDetail = function () {
  fetch(apiLink + "/" + carId, {
    headers: { Authorization: keyAutorizzazione },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nel recupero del singolo concerto");
      }
    })
    .then((car) => {
      console.log("car", car);

      dublicaCarInDetail(car);
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

const dublicaCarInDetail = function (card) {
  const row = document.querySelector(".row");
  const colonnaCar = document.createElement("div");
  colonnaCar.classList.add("col", "col-12", "col-md-4", "col-lg-3");
  colonnaCar.innerHTML = `
          <div class="card h-100 shadow rounded-1 borderCar ">
    <img src="${card.imageUrl}" class="card-img-top" alt="car">
    <div class="card-body d-flex flex-column bg-dark">
      <h5 class="card-title text-light ms-2 mt-2">${card.name}</h5>
      <p class="card-text text-light flex-grow-1 ms-2">${card.description}</p>
      <p class="card-text text-light ms-2">${card.brand} - ${card.price}€</p>
              <a href="./homepage.html" class="btn buttonDetail rounded-0">VAI ALLA HOME PAGE</a>
               <a href="./backOffice.html?carId=${card._id}" class="btn buttonDetail rounded-0">MODIFICA PRODOTTO</a>
               <a href="#" class="btn buttonDeleteProduct rounded-0">ELIMINA PRODOTTO</a>
          </div>
      </div>
      `;
  row.appendChild(colonnaCar);

  const buttonDeleteProduct = colonnaCar.querySelector(".buttonDeleteProduct");

  buttonDeleteProduct.addEventListener("click", function (e) {
    e.preventDefault();

    const deleteConfirmModal = new bootstrap.Modal(
      document.getElementById("deleteConfirmModal")
    );
    deleteConfirmModal.show();

    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

    // Aggiungo un evento click per confermare l'eliminazione e all'interno lancio la fetch delete
    confirmDeleteBtn.addEventListener("click", function () {
      fetch(apiLink + "/" + card._id, {
        method: "DELETE",
        headers: { Authorization: keyAutorizzazione },
      })
        .then((response) => {
          if (response.ok) {
            alert("Articolo eliminato con successo");
            location.assign("./homepage.html"); // Reindirizza alla homepage
          } else {
            throw new Error("Errore nella cancellazione dell'elemento");
          }
        })
        .catch((err) => {
          console.log("ERRORE nella cancellazione", err);
        });

      // Chiude il modale dopo la conferma
      deleteConfirmModal.hide();
    });
  });
};

carInDetail();
