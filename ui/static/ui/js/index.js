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

const asideMenuList = document.querySelectorAll(".dropDn");

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

// if (hashtagSpace.innerHTML == "") {
//   hashtagSpace.innerHTML =
//     hashtagNames[Math.floor(Math.random() * 4)].innerHTML;
// }

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
insightCategory[0].style.color = "#d97a7a";
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

const collectionPosts = [
  ...document.getElementsByClassName("collection__post__container"),
];

function showEachCollection(collection) {
  let max = collection.length < 4 ? collection.length : 4;
  for (let i = 0; i < max; i++) {
    const targetCollection = collectionPosts[i];
    const currentCollection = collection[i];
    targetCollection.querySelector(".collection__post__title").innerText =
      currentCollection.title;

    targetCollection.querySelector(".collection__post__author").innerText =
      currentCollection.author_id;

    targetCollection.querySelector(
      ".post__like"
    ).innerText = `👍(${currentCollection.likes})`;

    targetCollection.querySelector(
      ".post__market"
    ).innerText = `🛒(${currentCollection.refCount})`;

    // targetCollection.querySelector(".third__img").childNodes[0].setAttribute("src",)
  }
}

async function filterCollection(event) {
  const targetName = event.target.innerText.replace("#", "");
  $.get("/collection?category=" + targetName, function (data, status) {
    showEachCollection(data);
  });
}

$.get("/collection?category=정치", function (data, status) {
  showEachCollection(data);
  document.querySelector(".sentence__namespace").innerText = "#정치";
});

hashTagList.forEach((hashTag) => {
  hashTag.addEventListener("click", filterCollection);
});

// 컬렉션

// 오늘의 인사이트 필터링

function showInsight(data) {
  let max = data.length < 4 ? data.length : 4;
  for (let i = 0; i < max; i++) {
    const targetInsight = data[i];
    const currentInsight = todaysInsights[i];

    currentInsight.querySelector(
      ".todays__insight__post__hashtag"
    ).innerText = `#${targetInsight.category}`;

    currentInsight.querySelector(
      ".todays__insight__post__title"
    ).childNodes[0].innerText = targetInsight.title;

    currentInsight.querySelector(
      ".todays__insight__post__body"
    ).childNodes[1].innerText = targetInsight.content.replace(
      /[^ㄱ-ㅎ|^ㅏ-ㅣ|^가-힣]/g,
      " "
    );

    currentInsight.querySelector(
      ".post__like"
    ).innerText = `👍(${targetInsight.likes})`;

    currentInsight.querySelector(
      ".post__market"
    ).innerText = `🛒(${targetInsight.refCount})`;

    currentInsight.querySelector(".written__by").innerText = targetInsight.id;
  }
}

async function filterInsights(event) {
  const targetNode = event.target;
  console.log(targetNode.innerText);
  $.get("post?category=" + targetNode.innerText, function (data, status) {
    showInsight(data);
  });
}

const insightHashTags = [
  ...document.getElementsByClassName("todays__insight__hashtag"),
];

const todaysInsights = [
  ...document.getElementsByClassName("todays__insight__post__container"),
];

insightHashTags.forEach((insight) => {
  insight.addEventListener("click", filterInsights);
});
// 추천은 한번까지만

const insight__post__like = [
  ...document.getElementsByClassName("insight__post__like"),
];

$.get("post?category=정치", function (data, status) {
  showInsight(data);
});

function limitThumbsUp(id) {
  if (localStorage.getItem(id)) {
    return;
  } else {
    localStorage.setItem(id, true);
    renewThumbsUp(id);
    thumup(id);
  }
}

// 게시글 클릭할 때 이동

function moveEachArticle(event) {
  let targetArticle = event.target.parentNode;
  let post_id = targetArticle.querySelector(".written__by").innerText;
  console.log(post_id);
  location.href = `../post/page/${post_id}`;
}

const todayInsightsTitle = [
  ...document.getElementsByClassName("todays__insight__post__img"),
];

todayInsightsTitle.forEach((insight) => {
  insight.addEventListener("click", moveEachArticle);
});

const insightImgs = [
  ...document.getElementsByClassName("todays__insight__post__img"),
];

function moveEachArticle(event) {
  const targetNode = event.target.parentNode;
  const targetIdx = targetNode.querySelector(".written__by").innerText;
  location.href = `../post/page/${targetIdx}`;
}

insightImgs.forEach((img) => {
  img.addEventListener("click", moveEachArticle);
});

// 추천인사이트 클릭 시 이동

const recommendedInsight = [
  ...document.getElementsByClassName("recommend__insight__post__image"),
];

// function moveRecommendAritcle(event) {
//   const targetNode = event.target.id;
//   console.log(targetNode);
//   // location.href = `../post/page/${targetIdx}`;
// }

recommendedInsight.forEach((recommend) => {
  recommend.addEventListener("click", moveRecommendAritcle);
});
