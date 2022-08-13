const navBarLoginBtn = document.querySelector(".navBar__login__btn");
const modalSection = document.querySelector("#modal");
const modalClose = document.querySelector("#modal__close");
const darkBg = document.querySelector(".bg__dark");
const navProfileImg = document.querySelector(".navBar__profile__img");
const hideAsideIcon = document.querySelector("#aside__top__icon");
const asideBar = document.querySelector("aside");
const showAsideIcon = document.querySelector("#navBar__toggle__icon");
const showCategory = document.querySelector(".category_name");
const chooseCategory = document.querySelectorAll(".category_btn");

const closeLoginModal = () => {
  modalSection.classList.remove("modal__show");
  modalSection.style.visibility = "hidden";
  darkBg.style.display = "none";
};

const openLoginModal = () => {
  modalSection.classList.add("modal__show");
  modalSection.style.visibility = "visible";
  darkBg.style.display = "block";
};

navBarLoginBtn.addEventListener("click", openLoginModal);
modalClose.addEventListener("click", closeLoginModal);

const isLogin = () => {
  let profileLocal = localStorage.getItem("profile");

  if (profileLocal) {
    navBarLoginBtn.style.display = "none";
    navProfileImg.src = profileLocal;
    navProfileImg.style.display = "block";
  }
};

const hideAsideBar = () => {
  asideBar.classList.remove("show_aside");
  setTimeout(() => {
    asideBar.style.visibility = "hidden";
  }, 500);
};

const showAsideBar = () => {
  asideBar.style.visibility = "visible";
  asideBar.classList.add("show_aside");
};

hideAsideIcon.addEventListener("click", hideAsideBar);
showAsideIcon.addEventListener("click", showAsideBar);

const asideMenuList = document.querySelectorAll(".dropDn");

// 어사이드 바 밑에 노션처럼 세부 페이지 토글
const toggleAsideMenu = (e) => {
  let childList = e.target.children[0];
  childList.style.display =
    childList.style.display == "" || childList.style.display == "none"
      ? "block"
      : "none";
};

asideMenuList.forEach((li) => {
  li.addEventListener("click", toggleAsideMenu);
});
//

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
const addAsideMyCafeList = (e) => {
  asideInputIcon[0].style.display = "block";
  addAsideIcon[0].style.display = "none";
};

let asideInputIcon = document.getElementsByClassName("list__mycafe__input");
let addAsideIcon = document.getElementsByClassName("list__mycafe__add");

addAsideIcon[0].addEventListener("click", addAsideMyCafeList);

asideInputIcon[0].addEventListener("keyup", addListIfTyped);

//article__min toggle 버튼 눌렀을 때 min 사라지고 max 나타남

const minToggleList = [...document.getElementsByClassName("article__toggle")];

const maxArticleList = [
  ...document.getElementsByClassName("article__container__max"),
];

function showMaxArticle(event) {
  let targetedIdx = minToggleList.indexOf(event.target);
  let targetedArticle = event.target.parentNode;
  targetedArticle.style.display = "none";
  maxArticleList[targetedIdx].style.display = "block";
}

Array.from(minToggleList).forEach((minArticle) => {
  minArticle.addEventListener("click", showMaxArticle);
});

//max toggle 버튼 눌렀을 때 max 없어지고 min 다시 나타나게

const toggleMinIcons = [
  ...document.getElementsByClassName("article__toggle__max"),
];

function showMinArticle(event) {
  let targetedNode =
    event.target.nodeName == "P" ? event.path[2] : event.path[1];
  let targetedIdx = maxArticleList.indexOf(targetedNode);
  console.log(targetedNode);
  targetedNode.style.display = "none";
  minToggleList[targetedIdx].parentNode.style.display = "flex";
}

toggleMinIcons.forEach((toggleMin) => {
  toggleMin.addEventListener("click", showMinArticle);
});

// 글 쓸 때 span 누르면 한꺼번에 없어지고, 내용이 없으면 다시 기본 내용으로 돌아오도록

const writeSpanList = [...document.getElementsByClassName("write__title")];
const writeTitleContainer = document.getElementsByClassName(
  "write__title__container"
);

function checkIfBlank() {
  writeSpanList.forEach((span) => {
    if (span.innerHTML == "") {
      if (span.parentNode.classList[0] == "big") {
        span.innerHTML = "제목을 입력하세요.";
      } else if (span.parentNode.classList[0] == "regular") {
        span.innerHTML = "소제목을 입력하세요.";
      } else {
        span.innerHTML = "00번째 라떼의 글을 꾸며봐요.";
      }
    }
  });
}

function removeAllSpanText(e) {
  e.target.innerText = "";
}

writeSpanList.forEach((writeSpan) => {
  writeSpan.addEventListener("click", checkIfBlank);
  writeSpan.addEventListener("click", removeAllSpanText);
});

//login 체크, local memory 가져와서 확인
isLogin();
