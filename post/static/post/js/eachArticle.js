const navBarLoginBtn = document.querySelector(".navBar__login__btn");
const modalSection = document.querySelector("#modal");
const modalClose = document.querySelector("#modal__close");
const darkBg = document.querySelector(".bg__dark");
const navProfileImg = document.querySelector(".navBar__profile__img");
const hideAsideIcon = document.querySelector("#aside__top__icon");
const asideBar = document.querySelector("aside");
const showAsideIcon = document.querySelector("#navBar__toggle__icon");

// const isLogin = () => {
//   let profileLocal = localStorage.getItem("profile");

//   if (profileLocal) {
//     navBarLoginBtn.style.display = "none";
//     navProfileImg.src = profileLocal;
//     navProfileImg.style.display = "block";
//   }
// };

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

// 어사이드 바 밑에 노션처럼 세부 페이지 토글
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

//input이 활성화 되었을 때 텍스트 입력 시 리스트 추가

const addListIfTyped = (e) => {
  if (e.key == "Enter") {
    if (e.target.value) {
      e.target.previousElementSibling.remove();

      let newList = document.createElement("p");
      newList.innerHTML = `
      <p class="dropDn">${e.target.value}</p>
      `;
      e.target.parentNode.appendChild(newList);

      let newAddIcon = document.createElement("li");
      newAddIcon.innerHTML = `
      <p class="list__mycafe__add">&#43;</p>
      <input class="list__mycafe__input" type="text" />
      `;
      e.target.parentNode.parentNode.appendChild(newAddIcon);
      e.target.remove();
    }
  }
};

//https://stackoverflow.com/questions/67104192/how-to-update-created-elements
//참고하자

// aside 바 메뉴에서 카테고리를 추가할 때
// const addAsideMyCafeList = (e) => {
//   asideInputIcon[0].style.display = "block";
//   addAsideIcon[0].style.display = "none";
// };

// let asideInputIcon = document.getElementsByClassName("list__mycafe__input");
// let addAsideIcon = document.getElementsByClassName("list__mycafe__add");

// addAsideIcon[0].addEventListener("click", addAsideMyCafeList);

// asideInputIcon[0].addEventListener("keyup", addListIfTyped);

//article__min toggle 버튼 눌렀을 때 min 사라지고 max 나타남

const minToggleList = [...document.getElementsByClassName("article__toggle")];

const maxArticleList = [
  ...document.getElementsByClassName("article__container__max"),
];

function showMaxArticle(event) {
  let eventTarget =
    event.target.nodeName == "I" ? event.target.parentNode : event.target;
  let targetedIdx = minToggleList.indexOf(eventTarget);
  let targetedArticle = eventTarget.parentNode;
  targetedArticle.style.display = "none";
  maxArticleList[targetedIdx].style.display = "flex";
}

minToggleList.forEach((minArticle) => {
  minArticle.addEventListener("click", showMaxArticle);
});

//max toggle 버튼 눌렀을 때 max 없어지고 min 다시 나타나게

const toggleMinIcons = [
  ...document.getElementsByClassName("article__toggle__max"),
];

function showMinArticle(event) {
  let targetedNode =
    event.target.nodeName == "I"
      ? event.target.parentNode.parentNode
      : event.target.parentNode;
  let targetedIdx = maxArticleList.indexOf(targetedNode);
  targetedNode.style.display = "none";
  minToggleList[targetedIdx].parentNode.style.display = "flex";
}

toggleMinIcons.forEach((toggleMin) => {
  toggleMin.addEventListener("click", showMinArticle);
});

// 참고기사 보여주기

const listToggleMin = document.getElementById("list__toggle__min");
const listToggleMax = document.getElementById("list__toggle__max");
const articleLists = [
  ...document.getElementsByClassName("list__line__container"),
][0];

function showArticleLists() {
  listToggleMin.style.display = "none";
  listToggleMax.style.display = "block";
  articleLists.style.display = "flex";
}

function hideArticleLists() {
  listToggleMin.style.display = "block";
  listToggleMax.style.display = "none";
  articleLists.style.display = "none";
}

listToggleMin.addEventListener("click", showArticleLists);
listToggleMax.addEventListener("click", hideArticleLists);

//login 체크, local memory 가져와서 확인
// isLogin();

const navBarRedirectBtn = document.querySelector(".navBar__name__h1");

function redirectHomepage() {
  location.href = "";
}

navBarRedirectBtn.addEventListener("click", redirectHomepage);
