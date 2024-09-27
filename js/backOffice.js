const keyAutorizzazione =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWFhNzc5YzQ1ZjAwMTU2OWI0YjUiLCJpYXQiOjE3Mjc0MjEwOTUsImV4cCI6MTcyODYzMDY5NX0._4gi8zkpd_oEk87bmSbyP1pkqeJw_WP-lQr0-ENm9eQ";
const apiLink = "https://striveschool-api.herokuapp.com/api/product/";

class car {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const price = document.getElementById("price").value;
  const imageUrl = document.getElementById("imageUrl").value;

  const objectCar = new car(name, description, brand, imageUrl, price);
  console.log("Car creata dal form", objectCar);

  let comportamentoIndirizzo;
  if (carId) {
    comportamentoIndirizzo = apiLink + "/" + carId;
  } else {
    comportamentoIndirizzo = apiLink;
  }

  fetch(comportamentoIndirizzo, {
    method: carId ? "PUT" : "POST", //SOSTITUISCO method: "POST",  cosi che se id esiste la fetch ci porta nel modifica(PUT), se non esiste ci crea il prodotto(POST)
    body: JSON.stringify(objectCar),
    headers: {
      "Content-type": "application/json",
      Authorization: keyAutorizzazione,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(response);
        alert("Prodotto Modificato");
        location.assign("./homepage.html");
      } else {
        throw new Error("Errore nella risposta");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
});

const buttonReset = document.querySelector(".buttonReset");
buttonReset.addEventListener("click", function (e) {
  e.preventDefault();
  form.reset();
});

/////
/////
/////RECUPERO I DATI DELL CARD INSERITI PRECEDENTEMENTE NEL FORM

const contenutoBarraUrl = new URLSearchParams(location.search);
const carId = contenutoBarraUrl.get("carId");

const recuperoDatiCarForm = function () {
  if (carId) {
    fetch(apiLink + "/" + carId, {
      headers: { Authorization: keyAutorizzazione },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero del concerto da modificare");
        }
      })
      .then((car) => {
        const name = document.getElementById("name");
        const description = document.getElementById("description");
        const brand = document.getElementById("brand");
        const price = document.getElementById("price");
        const imageUrl = document.getElementById("imageUrl");

        name.value = car.name;
        description.value = car.description;
        brand.value = car.brand;
        imageUrl.value = car.imageUrl;
        price.value = car.price;
        //andiamo a modificare il testo del bottone quando ritorniamo nel form
        document.querySelector(".buttonSave").innerText = "MODIFICA PRODOTTO";
      })
      .catch((err) => {
        console.log("ERRORE SIAMO NELLA CATCH", err);
      });
  }
};
recuperoDatiCarForm();
