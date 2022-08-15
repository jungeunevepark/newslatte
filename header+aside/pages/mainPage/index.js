const navBarLoginBtn = document.querySelector(".navBar__login__btn");
const modalSection = document.querySelector("#modal");
const modalClose = document.querySelector("#modal__close");
const darkBg = document.querySelector(".bg__dark");
const navProfileImg = document.querySelector(".navBar__profile__img");
const hideAsideIcon = document.querySelector("#aside__top__icon");
const asideBar = document.querySelector("aside");
const showAsideIcon = document.querySelector("#navBar__toggle__icon");
const showCategory = document.querySelector('.category_name');
const chooseCategory = document.querySelectorAll('.category_btn');

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

//login 체크, local memory 가져와서 확인
isLogin();

//contentsNav 항상 표시되도록
var headerHeight = document.querySelector(".forHeight").offsetHeight;
var rcollectionLocation = document.querySelector("#recommend__collection").offsetTop;
var rinsightLocation = document.querySelector(".recommend__insight__container").offsetTop;
var tinsightLocation = document.querySelector(".todays__insight__container").offsetTop;
const contentsNav = document.querySelectorAll(".Contents__btn");

const alwaysredNav = () => {
  if (window.scrollY < rcollectionLocation - headerHeight){
    contentsNav[0].style.color = "#d97a7a";
    contentsNav[0].style.borderBottom = "2px solid #d97a7a";
    contentsNav[1].style.color = "black";
    contentsNav[1].style.border = "none";
    contentsNav[2].style.color = "black";
    contentsNav[2].style.border = "none";
    contentsNav[3].style.color = "black";
    contentsNav[3].style.border = "none";
  } else {
    if (window.scrollY < rinsightLocation - headerHeight){
      contentsNav[1].style.color = "#d97a7a";
      contentsNav[1].style.borderBottom = "2px solid #d97a7a";
      contentsNav[0].style.color = "black";
      contentsNav[0].style.border = "none";
      contentsNav[2].style.color = "black";
      contentsNav[2].style.border = "none";
      contentsNav[3].style.color = "black";
      contentsNav[3].style.border = "none";
    } else {
      if (window.scrollY < tinsightLocation - headerHeight){
        contentsNav[2].style.color = "#d97a7a";
        contentsNav[2].style.borderBottom = "2px solid #d97a7a";
        contentsNav[1].style.color = "black";
        contentsNav[1].style.border = "none";
        contentsNav[0].style.color = "black";
        contentsNav[0].style.border = "none";
        contentsNav[3].style.color = "black";
        contentsNav[3].style.border = "none";
      } else {
        contentsNav[3].style.color = "#d97a7a";
        contentsNav[3].style.borderBottom = "2px solid #d97a7a";
        contentsNav[1].style.color = "black";
        contentsNav[1].style.border = "none";
        contentsNav[2].style.color = "black";
        contentsNav[2].style.border = "none";
        contentsNav[0].style.color = "black";
        contentsNav[0].style.border = "none";
      }
    }
  }
}

window.addEventListener("scroll", alwaysredNav);
  

//contentsNav 누르면 원하는 곳으로 스크롤

const scrollPage = (e) => {
  e.target.style.color = "#d97a7a";
  e.target.style.borderBottom = "2px solid #d97a7a";
  if (e.target.innerHTML == "뉴스라떼"){
    window.scrollTo({top: 0, behavior: 'smooth'});
    contentsNav[1].style.color = "black";
    contentsNav[1].style.border = "none";
    contentsNav[2].style.color = "black";
    contentsNav[2].style.border = "none";
    contentsNav[3].style.color = "black";
    contentsNav[3].style.border = "none";
  }
  if (e.target.innerHTML == "추천 컬렉션"){
    window.scrollTo({top: rcollectionLocation - headerHeight, behavior: 'smooth'});
    contentsNav[0].style.color = "black";
    contentsNav[0].style.border = "none";
    contentsNav[2].style.color = "black";
    contentsNav[2].style.border = "none";
    contentsNav[3].style.color = "black";
    contentsNav[3].style.border = "none";
  }
  if (e.target.innerHTML == "추천 인사이트"){
    window.scrollTo({top: rinsightLocation - headerHeight, behavior: 'smooth'});
    contentsNav[1].style.color = "black";
    contentsNav[1].style.border = "none";
    contentsNav[0].style.color = "black";
    contentsNav[0].style.border = "none";
    contentsNav[3].style.color = "black";
    contentsNav[3].style.border = "none";
  }
  if (e.target.innerHTML == "오늘의 인사이트"){
    window.scrollTo({top: tinsightLocation - headerHeight, behavior: 'smooth'});
    contentsNav[1].style.color = "black";
    contentsNav[1].style.border = "none";
    contentsNav[2].style.color = "black";
    contentsNav[2].style.border = "none";
    contentsNav[0].style.color = "black";
    contentsNav[0].style.border = "none";
  }
}

for(let i = 0; i < contentsNav.length; i++){
  contentsNav[i].addEventListener("click", scrollPage);
}

const hashtagSpace = document.querySelector(".sentence__namespace");
const hashtagNames = document.querySelectorAll(".hashtag__btn");
const hashtagLeft = document.querySelector(".collection__post__left");
const hashtagRight = document.querySelector(".collection__post__right");

if (hashtagSpace.innerHTML == ""){
    hashtagSpace.innerHTML = hashtagNames[Math.floor((Math.random() * 4))].innerHTML;
}

const hashtagChoose = (e) => {
  hashtagSpace.innerHTML = e.target.innerHTML;
}

for (let i = 0; i < hashtagNames.length; i++){
  hashtagNames[i].addEventListener("click", hashtagChoose);
}

const lefty = (e) => {
  if (hashtagSpace.innerHTML == hashtagNames[0].innerHTML){
    hashtagSpace.innerHTML = hashtagNames[3].innerHTML;
  } else {
    if (hashtagSpace.innerHTML == hashtagNames[1].innerHTML){
      hashtagSpace.innerHTML = hashtagNames[0].innerHTML;
    } else {
      if (hashtagSpace.innerHTML == hashtagNames[2].innerHTML){
        hashtagSpace.innerHTML = hashtagNames[1].innerHTML;
      } else {
        if (hashtagSpace.innerHTML == hashtagNames[3].innerHTML){
          hashtagSpace.innerHTML = hashtagNames[2].innerHTML;
        }
      }
    }
  }
}

hashtagLeft.addEventListener("click", lefty);

const righty = (e) => {
  if (hashtagSpace.innerHTML == hashtagNames[0].innerHTML){
    hashtagSpace.innerHTML = hashtagNames[1].innerHTML;
  } else {
    if (hashtagSpace.innerHTML == hashtagNames[1].innerHTML){
      hashtagSpace.innerHTML = hashtagNames[2].innerHTML;
    } else {
      if (hashtagSpace.innerHTML == hashtagNames[2].innerHTML){
        hashtagSpace.innerHTML = hashtagNames[3].innerHTML;
      } else {
        if (hashtagSpace.innerHTML == hashtagNames[3].innerHTML){
          hashtagSpace.innerHTML = hashtagNames[0].innerHTML;
        }
      }
    }
  }
}

hashtagRight.addEventListener("click", righty);

//정해진 위치에 오면 div 추가하여 장바구니가 가리지 않도록 함.

//오늘의 인사이트 카테고리 선택

const insightCategory = document.querySelectorAll(".todays__insight__hashtag");

console.log(insightCategory);
const selectCategory = (e) => {
  for (let i = 0; i < insightCategory.length; i++){
    if (insightCategory[i].innerHTML !== e.target.innerHTML){
      insightCategory[i].style.color = "black";
    }
  }
  e.target.style.color = "#d97a7a";
}

for (let i = 0; i < insightCategory.length; i++){
  insightCategory[i].addEventListener("click", selectCategory);
}