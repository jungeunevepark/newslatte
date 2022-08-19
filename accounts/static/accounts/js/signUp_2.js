function CheckIsBlank(event) {
  let secondSignUpInputs = [
    ...event.currentTarget.getElementsByClassName("modal__signUp__input"),
  ];

  secondSignUpInputs.forEach((input) => {
    if (input.innerText == "") {
      event.preventDefault();
    }
  });
}

const navBarRedirectBtn = document.querySelector(".navBar__name__h1");

function redirectHomepage() {
  location.href = "";
}

navBarRedirectBtn.addEventListener("click", redirectHomepage);
