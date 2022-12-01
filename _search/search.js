document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == "38") {
    document.activeElement.blur();
    return;
  } else if (e.keyCode == "40") {
    document.activeElement.blur();
    return;
  }
}
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
//setup before functions
let typingTimer; //timer identifier
let doneTypingInterval = 260; //time in ms (half a seconds)
let myInput = document.getElementById("searchTerm");
myInput.addEventListener(
  "keyup",
  function (e) {
    e.preventDefault();
  },
  false
);
//on keyup, start the countdown
myInput.addEventListener("keyup", () => {
  clearTimeout(typingTimer);

  if (myInput.value != null) {
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  } else {
    $(UlDropdown).empty();
  }
});

//user is "finished typing," do something
function doneTyping() {
  const searchTerm = document.querySelector(".searchTerm");
  const UlDropdown = document.querySelector(".UlDropdown");
  $(UlDropdown).empty();
  let term = searchTerm.value;
  var url = "http://127.0.0.1:8000/api/product/search-products/" + term;
  var xhr = new XMLHttpRequest();
  if (url == "http://127.0.0.1:8000/api/product/search-products/") {
    return;
  } else {
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let data = JSON.parse(xhr.response);
        data.map((data) => {
          UlDropdown.append(ul_func(data.product_name, data.variant_id));
        });
      }
    };
    xhr.send();
  }
}
function ul_func(product_name, variant_id) {
  let li = document.createElement("li");
  li.classList.add("product_li");
  if (product_name == undefined) {
    li.innerHTML = `
    Product Not Found`;
    return li;
  } else {
    li.id = `${variant_id}`;
    li.innerHTML = `${product_name}`;
    return li;
  }
}
$(document).on("keypress", "#searchTerm", function (e) {
  if (e.keyCode == 13 || e.which == "13") {
    search();
  }
});

var button = document.getElementById("searchButton");

function search() {
  const searchTerm = document.querySelector(".searchTerm");
  var url =
    "http://127.0.0.1:8000/api/product/search-products/" + searchTerm.value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let data = xhr.responseText;
      localStorage.setItem("searchdata", data);
      window.open("order/order-min.html");
    }
  };
  xhr.send();
  localStorage.setItem("searchTerm", searchTerm.value);
}

let ul = document.getElementById("UlDropdown");
var liSelected;
var index = -1;
document.addEventListener(
  "keydown",
  function (event) {
    var len = ul.getElementsByTagName("li").length - 1;
    if (event.which === 40) {
      index++;
      //down
      if (liSelected) {
        removeClass(liSelected, "selected");
        next = ul.getElementsByTagName("li")[index];
        if (typeof next !== undefined && index <= len) {
          liSelected = next;
        } else {
          index = 0;
          liSelected = ul.getElementsByTagName("li")[0];
        }
        addClass(liSelected, "selected");
      } else {
        index = 0;
        liSelected = ul.getElementsByTagName("li")[0];
        addClass(liSelected, "selected");
      }
    } else if (event.which === 38) {
      //up
      if (liSelected) {
        removeClass(liSelected, "selected");
        index--;
        next = ul.getElementsByTagName("li")[index];
        if (typeof next !== undefined && index >= 0) {
          liSelected = next;
        } else {
          index = len;
          liSelected = ul.getElementsByTagName("li")[len];
        }
        addClass(liSelected, "selected");
      } else {
        index = 0;
        liSelected = ul.getElementsByTagName("li")[len];
        addClass(liSelected, "selected");
      }
    }
  },
  false
);
function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(
      new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"),
      " "
    );
  }
}
function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
    let val = el.id;
    localStorage.setItem("focus", val);
  } else {
    el.className += " " + className;
  }
}
