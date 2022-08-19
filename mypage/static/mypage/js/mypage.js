const navBarLoginBtn = document.querySelector(".navBar__login__btn");
const modalSection = document.querySelector("#modal");
const modalClose = document.querySelector("#modal__close");
const darkBg = document.querySelector(".bg__dark");
const navProfileImg = document.querySelector(".navBar__profile__img");
const hideAsideIcon = document.querySelector("#aside__top__icon");
const asideBar = document.querySelector("aside");
const showAsideIcon = document.querySelector("#navBar__toggle__icon");

const isLogin = () => {
  let profileLocal = localStorage.getItem("profile");

  if (profileLocal) {
    navBarLoginBtn.style.display = "none";
    navProfileImg.src = profileLocal;
    navProfileImg.style.display = "block";
  }
};

// const hideAsideBar = () => {
//   asideBar.classList.remove("show_aside");
//   asideBar.style.display = "none";
//   myPageMain.style.width = "100%";
// };
// const myPageMain = document.querySelector(".myPage__main");

// hideAsideIcon.addEventListener("click", hideAsideBar);

// const showAsideBar = () => {
//   asideBar.style.display = "block";
//   asideBar.classList.add("show_aside");
// };

// showAsideIcon.addEventListener("click", showAsideBar);

// let asideMenuList = document.getElementsByClassName("dropDn");

// // 어사이드 바 밑에 노션처럼 세부 페이지 토글
// const toggleAsideMenu = (e) => {
//   let childList = e.target.parentNode.getElementsByClassName(
//     "aside__list__myCafe"
//   );
//   childList[0].style.display =
//     childList[0].style.display == "" || childList[0].style.display == "none"
//       ? "block"
//       : "none";
// };
// Array.from(asideMenuList).forEach((p) => {
//   p.addEventListener("click", toggleAsideMenu);
// });
// //

// //input이 활성화 되었을 때 텍스트 입력 시 리스트 추가

// const addListIfTyped = (e) => {
//   if (e.key == "Enter") {
//     if (e.target.value) {
//       e.target.previousElementSibling.remove();

//       let newList = document.createElement("p");
//       newList.innerHTML = `
//       <p class="dropDn">${e.target.value}</p>
//       `;
//       e.target.parentNode.appendChild(newList);

//       let newAddIcon = document.createElement("li");
//       newAddIcon.innerHTML = `
//       <p class="list__mycafe__add">&#43;</p>
//       <input class="list__mycafe__input" type="text" />
//       `;
//       e.target.parentNode.parentNode.appendChild(newAddIcon);
//       e.target.remove();
//     }
//   }
// };

// //https://stackoverflow.com/questions/67104192/how-to-update-created-elements
// //참고하자

// // aside 바 메뉴에서 카테고리를 추가할 때
// const addAsideMyCafeList = (e) => {
//   asideInputIcon[0].style.display = "block";
//   addAsideIcon[0].style.display = "none";
// };

// let asideInputIcon = document.getElementsByClassName("list__mycafe__input");
// let addAsideIcon = document.getElementsByClassName("list__mycafe__add");

// addAsideIcon[0].addEventListener("click", addAsideMyCafeList);

// asideInputIcon[0].addEventListener("keyup", addListIfTyped);

//login 체크, local memory 가져와서 확인
isLogin();

// 메뉴이동

const writtensaveBtn = document.querySelector(".written__and__saved__choose");
const insightcollectionBtn = document.querySelector(
  ".insights__collection__choose"
);
const writtenList = document.querySelector(".written__articles__list");
const savedinsightsList = document.querySelector(".saved__insights__list");
const savedcollectionsList = document.querySelector(".saved__collection__list");
console.log(writtensaveBtn);
const writtensaveChoose = (e) => {
  if (e.target.innerHTML == writtensaveBtn.children[0].innerHTML) {
    writtensaveBtn.children[0].style.color = "#d97a7a";
    writtensaveBtn.children[0].style.borderBottom = "2px solid #d97a7a";
    writtensaveBtn.children[1].style.color = "#636363";
    writtensaveBtn.children[1].style.border = "none";
    writtenList.style.display = "inline-block";
    insightcollectionBtn.style.display = "none";
    savedinsightsList.style.display = "none";
    savedcollectionsList.style.display = "none";
  } else {
    writtensaveBtn.children[0].style.color = "#636363";
    writtensaveBtn.children[0].style.borderBottom = "none";
    writtensaveBtn.children[1].style.color = "#d97a7a";
    writtensaveBtn.children[1].style.borderBottom = "2px solid #d97a7a";
    insightcollectionBtn.children[0].style.color = "#d97a7a7a";
    insightcollectionBtn.children[0].style.borderBottom = "2px solid #d97a7a7a";
    insightcollectionBtn.children[1].style.color = "#636363";
    insightcollectionBtn.children[1].style.borderBottom = "none";
    writtenList.style.display = "inline-block";
    insightcollectionBtn.style.display = "flex";
    savedinsightsList.style.display = "inline";
    savedcollectionsList.style.display = "none";
    writtenList.style.display = "none";
  }
};

writtensaveBtn.children[0].addEventListener("click", writtensaveChoose);
writtensaveBtn.children[1].addEventListener("click", writtensaveChoose);

const insightcollectionChoose = (e) => {
  if (e.target.innerHTML == insightcollectionBtn.children[0].innerHTML) {
    insightcollectionBtn.children[0].style.color = "#d97a7a7a";
    insightcollectionBtn.children[0].style.borderBottom = "2px solid #d97a7a7a";
    insightcollectionBtn.children[1].style.color = "#636363";
    insightcollectionBtn.children[1].style.borderBottom = "none";
    savedinsightsList.style.display = "inline";
    savedcollectionsList.style.display = "none";
  } else {
    insightcollectionBtn.children[0].style.color = "#636363";
    insightcollectionBtn.children[0].style.borderBottom = "none";
    insightcollectionBtn.children[1].style.color = "#d97a7a7a";
    insightcollectionBtn.children[1].style.borderBottom = "2px solid #d97a7a7a";
    savedinsightsList.style.display = "none";
    savedcollectionsList.style.display = "inline";
  }
};

insightcollectionBtn.children[0].addEventListener(
  "click",
  insightcollectionChoose
);
insightcollectionBtn.children[1].addEventListener(
  "click",
  insightcollectionChoose
);

//배경색을 프로필 이미지 중간까지 오도록

const profileImg = document.querySelector(".profile__pic");
const wholeView = document.querySelector(".mypage__container");
const backgroundHeight = profileImg.clientHeight + 63;
wholeView.style.background =
  "linear-gradient(0 deg, #f1f1f1 124px, #ffffff 124px)";

const navBarRedirectBtn = document.querySelector(".navBar__name__h1");

function redirectHomepage() {
  location.href = "";
}

navBarRedirectBtn.addEventListener("click", redirectHomepage);
