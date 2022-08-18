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

//login 체크, local memory 가져와서 확인
isLogin();

//contentsNav 항상 표시되도록
var headerHeight = document.querySelector(".forHeight").offsetHeight;
var rcollectionLocation = document.querySelector(
  "#recommend__collection"
).offsetTop;
var rinsightLocation = document.querySelector(
  ".recommend__insight__container"
).offsetTop;
var tinsightLocation = document.querySelector(
  ".todays__insight__container"
).offsetTop;
const contentsNav = document.querySelectorAll(".Contents__btn");

const alwaysredNav = () => {
  if (window.scrollY < rcollectionLocation - headerHeight) {
    contentsNav[0].style.color = "#d97a7a";
    contentsNav[0].style.borderBottom = "2px solid #d97a7a";
    contentsNav[1].style.color = "black";
    contentsNav[1].style.border = "none";
    contentsNav[2].style.color = "black";
    contentsNav[2].style.border = "none";
    contentsNav[3].style.color = "black";
    contentsNav[3].style.border = "none";
  } else {
    if (window.scrollY < rinsightLocation - headerHeight) {
      contentsNav[1].style.color = "#d97a7a";
      contentsNav[1].style.borderBottom = "2px solid #d97a7a";
      contentsNav[0].style.color = "black";
      contentsNav[0].style.border = "none";
      contentsNav[2].style.color = "black";
      contentsNav[2].style.border = "none";
      contentsNav[3].style.color = "black";
      contentsNav[3].style.border = "none";
    } else {
      if (window.scrollY < tinsightLocation - headerHeight) {
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
};

window.addEventListener("scroll", alwaysredNav);

//contentsNav 누르면 원하는 곳으로 스크롤

const scrollPage = (e) => {
  e.target.style.color = "#d97a7a";
  e.target.style.borderBottom = "2px solid #d97a7a";
  if (e.target.innerHTML == "뉴스라떼") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    contentsNav[1].style.color = "black";
    contentsNav[1].style.border = "none";
    contentsNav[2].style.color = "black";
    contentsNav[2].style.border = "none";
    contentsNav[3].style.color = "black";
    contentsNav[3].style.border = "none";
  }
  if (e.target.innerHTML == "추천 컬렉션") {
    window.scrollTo({
      top: rcollectionLocation - headerHeight,
      behavior: "smooth",
    });
    contentsNav[0].style.color = "black";
    contentsNav[0].style.border = "none";
    contentsNav[2].style.color = "black";
    contentsNav[2].style.border = "none";
    contentsNav[3].style.color = "black";
    contentsNav[3].style.border = "none";
  }
  if (e.target.innerHTML == "추천 인사이트") {
    window.scrollTo({
      top: rinsightLocation - headerHeight,
      behavior: "smooth",
    });
    contentsNav[1].style.color = "black";
    contentsNav[1].style.border = "none";
    contentsNav[0].style.color = "black";
    contentsNav[0].style.border = "none";
    contentsNav[3].style.color = "black";
    contentsNav[3].style.border = "none";
  }
  if (e.target.innerHTML == "오늘의 인사이트") {
    window.scrollTo({
      top: tinsightLocation - headerHeight,
      behavior: "smooth",
    });
    contentsNav[1].style.color = "black";
    contentsNav[1].style.border = "none";
    contentsNav[2].style.color = "black";
    contentsNav[2].style.border = "none";
    contentsNav[0].style.color = "black";
    contentsNav[0].style.border = "none";
  }
};

for (let i = 0; i < contentsNav.length; i++) {
  contentsNav[i].addEventListener("click", scrollPage);
}

const hashtagSpace = document.querySelector(".sentence__namespace");
const hashtagNames = document.querySelectorAll(".hashtag__btn");
const hashtagLeft = document.querySelector(".collection__post__left");
const hashtagRight = document.querySelector(".collection__post__right");

if (hashtagSpace.innerHTML == "") {
  hashtagSpace.innerHTML =
    hashtagNames[Math.floor(Math.random() * 4)].innerHTML;
}

const hashtagChoose = (e) => {
  hashtagSpace.innerHTML = e.target.innerHTML;
};

for (let i = 0; i < hashtagNames.length; i++) {
  hashtagNames[i].addEventListener("click", hashtagChoose);
}

const lefty = (e) => {
  if (hashtagSpace.innerHTML == hashtagNames[0].innerHTML) {
    hashtagSpace.innerHTML = hashtagNames[3].innerHTML;
  } else {
    if (hashtagSpace.innerHTML == hashtagNames[1].innerHTML) {
      hashtagSpace.innerHTML = hashtagNames[0].innerHTML;
    } else {
      if (hashtagSpace.innerHTML == hashtagNames[2].innerHTML) {
        hashtagSpace.innerHTML = hashtagNames[1].innerHTML;
      } else {
        if (hashtagSpace.innerHTML == hashtagNames[3].innerHTML) {
          hashtagSpace.innerHTML = hashtagNames[2].innerHTML;
        }
      }
    }
  }
};

hashtagLeft.addEventListener("click", lefty);

const righty = (e) => {
  if (hashtagSpace.innerHTML == hashtagNames[0].innerHTML) {
    hashtagSpace.innerHTML = hashtagNames[1].innerHTML;
  } else {
    if (hashtagSpace.innerHTML == hashtagNames[1].innerHTML) {
      hashtagSpace.innerHTML = hashtagNames[2].innerHTML;
    } else {
      if (hashtagSpace.innerHTML == hashtagNames[2].innerHTML) {
        hashtagSpace.innerHTML = hashtagNames[3].innerHTML;
      } else {
        if (hashtagSpace.innerHTML == hashtagNames[3].innerHTML) {
          hashtagSpace.innerHTML = hashtagNames[0].innerHTML;
        }
      }
    }
  }
};

hashtagRight.addEventListener("click", righty);

//정해진 위치에 오면 div 추가하여 장바구니가 가리지 않도록 함.

//오늘의 인사이트 카테고리 선택

const insightCategory = document.querySelectorAll(".todays__insight__hashtag");
const selectCategory = (e) => {
  for (let i = 0; i < insightCategory.length; i++) {
    if (insightCategory[i].innerHTML !== e.target.innerHTML) {
      insightCategory[i].style.color = "black";
    }
  }
  e.target.style.color = "#d97a7a";
};

for (let i = 0; i < insightCategory.length; i++) {
  insightCategory[i].addEventListener("click", selectCategory);
}

// 팝업 내카페/저장한 글 선택

const myCartBtn = document.querySelectorAll(".popUP__myCart__Btn");
const choosesavedParent = document.querySelector(".choose__between__saved");
const choosebtwnSaved = document.querySelectorAll(".choose__saved__Btn");
const writtenInsight = document.querySelector(".written__insights__whole");
const savedInsight = document.querySelector(".insights__whole");
const savedCollection = document.querySelector(".collection__whole");

myCartBtn[0].style.fontWeight = "700";
myCartBtn[0].style.borderBottom = "1px solid #5f5a5a";
writtenInsight.style.display = "flex";

const chooseBtwn = (e) => {
  if (e.target.innerHTML == myCartBtn[0].innerHTML) {
    myCartBtn[0].style.fontWeight = "700";
    myCartBtn[0].style.borderBottom = "1px solid #5f5a5a";
    myCartBtn[1].style.fontWeight = "400";
    myCartBtn[1].style.borderBottom = "none";
    writtenInsight.style.display = "flex";
    choosesavedParent.style.display = "none";
    savedInsight.style.display = "none";
    savedCollection.style.display = "none";
  } else {
    myCartBtn[0].style.fontWeight = "400";
    myCartBtn[0].style.borderBottom = "none";
    myCartBtn[1].style.fontWeight = "700";
    myCartBtn[1].style.borderBottom = "1px solid #5f5a5a";
    writtenInsight.style.display = "none";
    choosesavedParent.style.display = "flex";
    choosebtwnSaved[0].style.color = "#d97a7a";
    choosebtwnSaved[0].style.borderBottom = "1px solid #d97a7a";
    savedInsight.style.display = "flex";
    savedCollection.style.display = "none";
  }
};

myCartBtn[0].addEventListener("click", chooseBtwn);
myCartBtn[1].addEventListener("click", chooseBtwn);

const chooseSaved = (e) => {
  if (e.target.innerHTML == choosebtwnSaved[0].innerHTML) {
    choosebtwnSaved[0].style.color = "#d97a7a";
    choosebtwnSaved[0].style.borderBottom = "1px solid #d97a7a";
    choosebtwnSaved[1].style.color = "#5f5a5a";
    choosebtwnSaved[1].style.borderBottom = "none";
    savedInsight.style.display = "flex";
    savedCollection.style.display = "none";
  } else {
    choosebtwnSaved[0].style.color = "#5f5a5a";
    choosebtwnSaved[0].style.borderBottom = "none";
    choosebtwnSaved[1].style.color = "#d97a7a";
    choosebtwnSaved[1].style.borderBottom = "1px solid #d97a7a";
    savedInsight.style.display = "none";
    savedCollection.style.display = "flex";
  }
};

choosebtwnSaved[0].addEventListener("click", chooseSaved);
choosebtwnSaved[1].addEventListener("click", chooseSaved);

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

var csrftoken = getCookie("csrftoken");

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}
$.ajaxSetup({
  beforeSend: function (xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
  },
});

function renewThumbsUp(id) {
  const targetThumb = document.getElementById(`${id}`);
  const countNum = parseInt(targetThumb.innerHTML.replace(/[^0-9]/g, ""));
  targetThumb.innerText = `👍(${countNum + 1})`;
}

function thumup(id) {
  // 좋아요 누르면 개수 늘어나도록.
  //그런데 한사람당 하나씩만 높일 수 있도록
  //우선 인사이트 id 보내기
  // console.log(id)

  $.post(
    "/ui/" + id + "/likes", //post 방식으로 서버에 요청을 보낸다.
    {
      csrfmiddlewaretoken: csrftoken,
      post_id: id, //서버에 필요한 정보를 같이 보냄.
    },
    function (data, status) {
      //서버에서 받은 데이터와 전송 성공 여부를 보여준다.(미완성)
      // const insightPostLike = [...document.getElementsByClassName("recommend__insight__post__others")]("id");
      // console.log(insightPostLike)
      // console.log(data['result'])
    }
  );
}

// 해쉬태그에 따라 컬렉션 달라지게

const hashTagList = [
  ...document.querySelector(".hashtag__list").getElementsByTagName("button"),
];

async function filterCollection(event) {
  const targetName = event.target.innerText.replace("#", "");
  console.log(`../../post?category=${targetName}`);
  await fetch(`../../post?category=${targetName}`)
    .then((response) => {
      console.log(response);
    })
    .then((data) => console.log(data, "성공"))
    .catch((error) => console.log(error, "에러"));

  // $.get("/post?category=정치", function (data, status) {
  //   console.log(data, status); // 전송받은 데이터와 전송 성공 여부를 보여줌.
  // });
}

hashTagList.forEach((hashTag) => {
  hashTag.addEventListener("click", filterCollection);
});

// 추천은 한번까지만

const insight__post__like = [
  ...document.getElementsByClassName("insight__post__like"),
];

function limitThumbsUp(id) {
  if (localStorage.getItem(id)) {
    return;
  } else {
    localStorage.setItem(id, true);
    renewThumbsUp(id);
    thumup(id);
  }
}
