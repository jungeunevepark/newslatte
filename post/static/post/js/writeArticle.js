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
const submitBtn = document.querySelector(".navBar__right__save.direct");
const collectionElement = document.querySelector(".myCart__each__list");

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

// navBarLoginBtn.addEventListener("click", openLoginModal);
// modalClose.addEventListener("click", closeLoginModal);

// const isLogin = () => {
//   let profileLocal = localStorage.getItem("profile");

//   if (profileLocal) {
//     navBarLoginBtn.style.display = "none";
//     navProfileImg.src = profileLocal;
//     navProfileImg.style.display = "block";
//   }
// };

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

// 글 쓸 때 span 누르면 한꺼번에 없어지고, 내용이 없으면 다시 기본 내용으로 돌아오도록

const writeSpanList = [...document.getElementsByClassName("write__title")];
const writeTitleContainer = document.getElementsByClassName(
  "write__title__container"
);

function checkIfBlank(e) {
  let span = e.target;
  if (span.innerHTML == "") {
    span.style.color = "lightgray";
    if (span.parentNode.classList[0] == "big") {
      span.innerHTML = "제목을 입력하세요.";
    } else if (span.parentNode.classList[0] == "regular") {
      span.innerHTML = "소제목을 입력하세요.";
    } else {
      span.innerHTML = "00번째 라떼의 글을 꾸며봐요.";
    }
  } else {
  }
}

function removeAllSpanText(e) {
  e.target.innerText = "";
  e.target.style.color = "black";
}

writeSpanList.forEach((writeSpan) => {
  writeSpan.addEventListener("focusout", checkIfBlank);
  writeSpan.addEventListener("click", removeAllSpanText);
});

// article__write에 focus 되어 있을 때 enter 누르면 줄 추가

const articleWriteArea = [
  ...document.getElementsByClassName("write__contents__container"),
][0];
const articleWriteSpan = [...articleWriteArea.getElementsByTagName("span")];
const articleWriteParagraph = [...articleWriteArea.getElementsByTagName("p")];

function addParagraphIfEnter(event) {
  if (event.key == "Enter") {
    event.preventDefault();
    const p = document.createElement("p");
    p.classList.add("small");
    const span = document.createElement("span");
    span.classList.add("write__title");
    span.setAttribute("contenteditable", "true");
    span.setAttribute("spellcheck", "false");
    p.appendChild(span);
    p.style.color = "black";
    articleWriteArea.appendChild(p);
  } else if (event.key == "Backspace" && event.target.innerHTML == "") {
    event.preventDefault();
    const deleteTarget = event.target.parentNode;
    deleteTarget.parentNode.removeChild(deleteTarget);
  }
}

function writeHandler(event) {
  event.target.addEventListener("keydown", addParagraphIfEnter);
}

function init() {
  articleWriteSpan.forEach((span) => {
    span.addEventListener("focus", writeHandler);
  });
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    let addElement;
    if (mutation.addedNodes[0]) {
      addElement = mutation.addedNodes[0];
      articleWriteParagraph.push(addElement);
      articleWriteSpan.push(addElement.childNodes[0]);
      init();
      addElement.childNodes[0].focus();
    } else {
      const previousIndex =
        articleWriteParagraph.indexOf(mutation.removedNodes[0]) - 1;
      articleWriteParagraph.splice(previousIndex + 1, 1);
      init();
      let targetFocus = [...articleWriteArea.getElementsByTagName("span")][
        previousIndex
      ];
      targetFocus.focus();
      //set a new range object
      let caret = document.createRange();
      //return the text selected or that will be appended to eventually
      let sel = window.getSelection();
      //get the node you wish to set range to
      caret.selectNodeContents(targetFocus);
      //set collapse to null or false to set at end of node
      caret.collapse(null);
      //make sure all ranges are removed from the selection object
      sel.removeAllRanges();
      //set all ranges to null and append it to the new range object
      sel.addRange(caret);
    }
  });
});

const config = { childList: true };

observer.observe(articleWriteArea, config);

// article controller 누르는 것에 따라 width resizing

const articleList = document.getElementById("article__list__container");
const articleWrite = document.getElementById("article__write__container");
const articleListController = [
  ...document.getElementsByClassName("article__list__controller"),
][0];

const leftSide = articleList.getBoundingClientRect().x;
const rightSide = articleListController.getBoundingClientRect().x;

function changeWidthSize(event) {
  let controller = event.screenX;
  let curWidth = controller - leftSide;
  if (curWidth >= 310 && rightSide - controller > -10) {
    articleList.style.width = `${curWidth}px`;
  }
}

let isResizing = false;

function removeResizeEvent() {
  document.removeEventListener("mousemove", changeWidthSize);
}

function changeSizeHandler() {
  document.addEventListener("mousemove", changeWidthSize);
  document.addEventListener("mouseup", removeResizeEvent);
}

articleListController.addEventListener("mousedown", changeSizeHandler);

//login 체크, local memory 가져와서 확인
// isLogin();

// var chosenCollectionId = undefined
// collectionElement.addEventListener("click", showArticles);
// function showArticles(id){
//   alert(id)
//   console.log(55)
// }

// function createPost(){

//   if (chosenCollectionId === undefined)
//   {
//     alert('컬렉션을 선택해주세요.');
//   }

//   // else{
//   //   $.post(
//   //     '',
//   //     {'csrfmiddleware': csrftoken,
//   //   }
//   //   )
//   // }
// }
// submitBtn.addEventListener("click", createPost);

// 본인이 가지고 있는 컬렉션 페이지 데이터를 받아오기

async function getCollectionId(id) {
  collection_id = id;
  const response = await fetch(`../../collection/${id}/news`);
  response.json().then((data) => {
    loopMinArticle(data.result);
  });
}

// min, max 부분에 데이터 뿌려주기

const minArticleList = [
  ...document.getElementsByClassName("article__container__min"),
];

function changeMinArticle(art, idx) {
  const targetMin = minArticleList[idx];

  // 이미지 넣어주기
  targetMin
    .querySelector(".contents__thumbNail__imgs")
    .setAttribute(
      "src",
      art.imageUrl ||
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FYwRdM%2FbtqSsQ5SjON%2FXkAU5i0emfsPyi2H42y831%2Fimg.jpg"
    );

  // 기사 제목 넣어주기
  targetMin.querySelector(".contents__title").childNodes[1].innerText =
    art.title;

  //기사 작은 본문 넣어주기
  targetMin.querySelector(".contents__paragraph").childNodes[1].innerText =
    art.main_content.substring(0, 90).replace(/\n/g, "") + "......";
}

function changeMaxArticle(art, idx) {
  const targetMax = maxArticleList[idx];

  // 뉴스 출처
  targetMax.querySelector(".texts__source__max").childNodes[1].innerText =
    art.press;

  // 뉴스 제목
  targetMax.querySelector(".texts__title__max").childNodes[1].innerText =
    art.title;

  // 뉴스 일자
  targetMax.querySelector(".texts__when__max").childNodes[1].innerText =
    art.date;

  // 뉴스 본문
  targetMax.querySelector(".contents__original__text").childNodes[1].innerText =
    art.main_content;

  // 뉴스 본문 이미지
  targetMax
    .querySelector(".contents__original__img")
    .childNodes[1].setAttribute(
      "src",
      art.imageUrl ||
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FYwRdM%2FbtqSsQ5SjON%2FXkAU5i0emfsPyi2H42y831%2Fimg.jpg"
    );
}

function changeDataHandler(article, idx) {
  const article__list = document.querySelector(".article__list");
  article__list.style.display = "flex";

  changeMinArticle(article, idx);
  changeMaxArticle(article, idx);
}

function loopMinArticle(data) {
  data.forEach((article, idx) => {
    changeDataHandler(article, idx);
  });
}

// 쓴 글 제출하기

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

function postrequest() {
  const targetHeader = [
    ...document.querySelector(".write__title__container").querySelectorAll("p"),
  ];

  const targetParagraph = document
    .querySelector(".write__contents__container")
    .innerHTML.replace(/[^ㄱ-ㅎ|^ㅏ-ㅣ|^가-힣]/g, " ");

  if (collection_id === undefined) {
    alert("please choose Collection.");
  } else {
    $.post("/post/create/", {
      csrfmiddlewaretoken: csrftoken,
      collectionId: collection_id,
      title: targetHeader[0].innerText,
      content: targetParagraph,
      subhead: targetHeader[1].innerText,
    });
  }
}

const writeArea = document.querySelector(".write__contents__container");

const saveBtn = [...document.querySelectorAll(".navBar__right__save")][1];
let collection_id;
saveBtn.addEventListener("click", postrequest);

// collection 가져오기

init();
