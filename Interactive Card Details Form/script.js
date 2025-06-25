const cardholderName = document.getElementById("cardholder-name"),
  cardNumber = document.getElementById("card-number"),
  month = document.getElementById("month"),
  year = document.getElementById("year"),
  cvc = document.getElementById("cvc"),
  errorCardholderName = document.getElementById("error-cardholder-name"),
  errorCardNumber = document.getElementById("error-card-number"),
  errorMonth = document.getElementById("error-month"),
  errorYear = document.getElementById("error-year"),
  errorCvc = document.getElementById("error-cvc");

cardholderName.addEventListener("input", (userInput) => {
  document.getElementById("name-element").innerHTML = userInput.target.value.trim().toUpperCase() || "JANE APPLESEED";
});

cardNumber.addEventListener("input", (userInput) => {
  let cardNumber = userInput.target.value;
  cardNumber = cardNumber.replace(/\s/g, "");
  cardNumber = cardNumber.replace(/(.{4})/g, "$1 ").trim();
  document.getElementById("card-number-element").innerHTML = cardNumber || "0000 0000 0000 0000";
  userInput.target.value = cardNumber;
});

month.addEventListener("input", (userInput) => {
  let val = userInput.target.value.trim().replace(/\D/g, "");

  if (val.length === 1)
    document.getElementById("month-element").innerHTML = "0" + val;
  else
    document.getElementById("month-element").innerHTML =
      val.substring(0, 2) || "00";
});
year.addEventListener("input", (userInput) => {
  let val = userInput.target.value.trim().replace(/\D/g, "");

  if (val.length === 1)
    document.getElementById("year-element").innerHTML = "0" + val;
  else
    document.getElementById("year-element").innerHTML =
      val.substring(0, 2) || "00";
});

cvc.addEventListener("input", (userInput) => {
  document.getElementById("cvc-element").innerHTML =
    userInput.target.value.trim() || "000";
});

function verification() {
  const inputsArray = [cardholderName, cardNumber, month, year, cvc],
  errorArray = [errorCardholderName, errorCardNumber, errorMonth, errorYear, errorCvc ],
  yearFull = new Date().getFullYear(),
  lastTwoDigits = String(yearFull).slice(-2); 

  let houveErro = false;

  function validName(name) {
    return /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(name);
  }

  function onlyNumbers(value) {
    return /^[0-9]+$/.test(value);
  }

  inputsArray.forEach((input, i) => {
    errorArray[i].innerHTML = "";
    input.classList.remove("errorOutline");

    if (i === 0) {
      if (input.value.trim() === "") {
        errorArray[i].innerHTML = "Can't be blank";
        input.classList.add("errorOutline");

        houveErro = true;
      } else if (!validName(input.value.trim())) {
        errorArray[i].innerHTML = "Name cannot contain numbers or special symbols.";
        input.classList.add("errorOutline");

        houveErro = true;
      }
    }

    if (i === 1) {
      if (input.value.trim() === "") {
        errorArray[i].innerHTML = "Can't be blank";
        input.classList.add("errorOutline");

        houveErro = true;
      } else if (!onlyNumbers(input.value.trim().replace(/\s/g, ''))) {
        errorArray[i].innerHTML = "Only numbers allowed in card number.";
        input.classList.add("errorOutline");

        houveErro = true;
      }
      else if (input.value.trim().replace(/\s/g, '').length < 16) {
        errorArray[i].innerHTML = "Card number is incomplete.";
        input.classList.add("errorOutline");

        houveErro = true;
      }
    }

    if (i === 2) {
      if (input.value.trim() === "") {
        errorArray[i].innerHTML = "Can't be blank";
        input.classList.add("errorOutline");

        houveErro = true;
      } else if (input.value > 12) {
        errorArray[i].innerHTML = "This month does not exist."
        input.classList.add("errorOutline");

        houveErro = true;
      }
    }

    if (i === 3) {
      if (input.value.trim() === "") {
        errorArray[i].innerHTML = "Can't be blank";
        input.classList.add("errorOutline");

        houveErro = true;
      } else if (i === 3 && input.value < lastTwoDigits) {
        errorArray[i].innerHTML = "This year is invalid."
        input.classList.add("errorOutline");

        houveErro = true;
      }
    }

    if (i === 4) {
      if (input.value.trim() === "") {
        errorArray[i].innerHTML = "Can't be blank";
        input.classList.add("errorOutline");

        houveErro = true;
      } else if (!onlyNumbers(input.value.trim().replace(/\s/g, ''))) {
        errorArray[i].innerHTML = "Only numbers!";
        input.classList.add("errorOutline");

        houveErro = true;
      } else if (input.value.trim().replace(/\s/g, '').length < 3) {
        errorArray[i].innerHTML = "Cvc is incomplete.";
        input.classList.add("errorOutline");

        houveErro = true;
      }
    }
  });

  if (!houveErro) {
    document.querySelector(".form-area").classList.add("display-none");
    document.querySelector(".success").classList.remove("display-none")
  }
}
