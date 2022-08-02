const navBarLoginBtn = document.querySelector(".navBar__login__btn");
const navProfileImg = document.querySelector(".navBar__profile__img");
const kakaoLogo = document.querySelector("#kakao__login");

const afterLogin = (profile) => {
  navBarLoginBtn.style.display = "none";
  navProfileImg.src = profile;
  navProfileImg.style.display = "block";
  if (!localStorage.getItem("profile")) {
    changeProfileImg(profile);
  }
};

const changeProfileImg = (profile) => {
  localStorage.setItem("profile", profile);
};

const isLogin = () => {
  let profileLocal = localStorage.getItem("profile");

  if (profileLocal) {
    navBarLoginBtn.style.display = "none";
    navProfileImg.src = profileLocal;
    navProfileImg.style.display = "block";
  }
};

isLogin();

function loginWithKakao() {
  Kakao.init("ab0c34d4a6279c5d063a25c32fac10aa");
  window.Kakao.Auth.login({
    scope: "profile_image, account_email",
    success: function (authobj) {
      console.log(authobj);
      Kakao.Auth.setAccessToken(authobj.access_token);
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          console.log(res);
          let user_email = res.kakao_account.email;
          let user_profile = res.properties.profile_image;
          afterLogin(user_profile);
          window.location.href = "http://127.0.0.1:5500/index.html";
        },
      });
    },
    fail: function (err) {
      alert(Json.stringify(err));
    },
  });
}

kakaoLogo.addEventListener("click", loginWithKakao);
