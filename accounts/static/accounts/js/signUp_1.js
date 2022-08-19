// const navBarLoginBtn = document.querySelector(".navBar__login__btn");
// const navProfileImg = document.querySelector(".navBar__profile__img");
// const kakaoLogo = document.querySelector(".kakao");

// const afterLogin = (profile) => {
//   navBarLoginBtn.style.display = "none";
//   navProfileImg.src = profile;
//   navProfileImg.style.display = "block";
//   if (!localStorage.getItem("profile")) {
//     changeProfileImg(profile);
//   }
// };

// const changeProfileImg = (profile) => {
//   localStorage.setItem("profile", profile);
// };

// const isLogin = () => {
//   let profileLocal = localStorage.getItem("profile");

//   if (profileLocal) {
//     navBarLoginBtn.style.display = "none";
//     navProfileImg.src = profileLocal;
//     navProfileImg.style.display = "block";
//   }
// };

// isLogin();

// function loginWithKakao() {
//   Kakao.init("ab0c34d4a6279c5d063a25c32fac10aa");
//   window.Kakao.Auth.login({
//     scope: "profile_image, account_email",
//     success: function (authobj) {
//       Kakao.Auth.setAccessToken(authobj.access_token);
//       window.Kakao.API.request({
//         url: "/v2/user/me",
//         success: (res) => {
//           console.log(res);
//           let user_email = res.kakao_account.email;
//           let user_profile = res.properties.profile_image;
//           afterLogin(user_profile);
//           window.location.href =
//             "http://127.0.0.1:5500/likelion_final/header+aside/pages/mainPage/index.html";
//         },
//       });
//     },
//     fail: function (err) {
//       alert(Json.stringify(err));
//     },
//   });
// }

// kakaoLogo.addEventListener("click", loginWithKakao);

const allSignUpInputs = [
  ...[
    ...document.getElementsByClassName("modal__signUp__container"),
  ][0].getElementsByTagName("input"),
];

let result_num = 0;

function showNextPageHandler(event) {
  let isValid = 0;
  allSignUpInputs.forEach((input) => {
    if (input.checkValidity() == true) {
      isValid += 1;
    }
  });
  console.log(isValid, isTrue);
  if (isValid != allSignUpInputs.length || isTrue != true) {
    event.preventDefault();
  }
}

// 패스워드 체크

const passwordCheck = document.getElementById("signUp__password__check");
const passwordAlert = document.getElementById("password__check__guide")
  .childNodes[0];

let isTrue = false;

function checkIfPwIsSame() {
  let password = document.getElementById("signUp__password");
  if (password.value == passwordCheck.value) {
    passwordAlert.innerText = "";
    isTrue = true;
  } else {
    passwordAlert.innerText = "비밀번호가 불일치합니다.";
    isTrue = false;
  }
}

passwordCheck.addEventListener("keyup", checkIfPwIsSame);

const navBarRedirectBtn = document.querySelector(".navBar__name__h1");

function redirectHomepage() {
  location.href = "";
}

navBarRedirectBtn.addEventListener("click", redirectHomepage);
