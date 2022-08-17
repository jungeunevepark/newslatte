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
