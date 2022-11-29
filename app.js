/** ##Sleep function for stopping the program
 -- ! note it can introduce a  side effect of the longer the milisecond of sleep it can bypass the excution and can be fired twice 
--  ! use less
*/
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
localStorage.setItem("varId1" , null);
localStorage.setItem("qty1" , null);
localStorage.setItem("varId2" , null);
localStorage.setItem("qty2" , null);
localStorage.setItem("varId3" , null);
localStorage.setItem("qty3" , null);
document.getElementById("searchTerm").value = localStorage.getItem("searchTerm");
productsearch1();
productsearch2();
productsearch3();


/** ##Sleep function*/
function productsearch1() {

let arr  = localStorage.getItem("searchdata");
let dit = JSON.parse(arr);
let pid1 = document.getElementById("pid1").value = dit[0].product_id;
document.getElementById("txtarea").value = dit[0].product_name;
  // let pid= 7996083306790;
  //Active Queue
  let headersList = {
    "X-Requested-With": "XMLHttp",
    "Content-Type": "application/json",
  };
  fetch("http://127.0.0.1:8000/api/ssd/product/" + pid1, {
    method: "GET",
    headers: headersList,
  })
    .then((response) => response.json())
    .then((json) => {
      localStorage.setItem("qty1", json.inventory_quantity);
      localStorage.setItem("varId1", json.variant_id);
    })

}

function availability1(){
  let quantity1 = localStorage.getItem("qty1");
  let pqty1 = parseInt(document.getElementById("quantity1").value);
  if (quantity1 == 0) {
    document.getElementById("availability1").textContent = "Unavailable";
  } else if (quantity1 < pqty1) {
    document.getElementById("availability1").textContent = "Insufficient";
  } else {
    document.getElementById("availability1").textContent = "Available";
  }
}
setInterval(availability1, 1000);








function productsearch2() {
  
  let arr = localStorage.getItem("searchdata")
  let dit = JSON.parse(arr);
  let pid2 = document.getElementById("pid2").value = dit[1].product_id;
  document.getElementById("txtarea1").value = dit[1].product_name;
  //Active Queue
  let headersList = {
    "X-Requested-With": "XMLHttp",
    "Content-Type": "application/json",
  };
  fetch("http://127.0.0.1:8000/api/ssd/product/" + pid2, {
    method: "GET",
    headers: headersList,
  })
    .then((response) => response.json())
    .then((json) => {
      localStorage.setItem("qty2", json.inventory_quantity);
      localStorage.setItem("varId2", json.variant_id);
    });
 
}

function availability2(){
  let quantity2 = localStorage.getItem("qty2");
  let pqty2 = parseInt(document.getElementById("quantity2").value);
  if (quantity2 == 0) {
    document.getElementById("availability2").textContent = "Unavailable";
  } else if (quantity2 < pqty2) {
    document.getElementById("availability2").textContent = "Insufficient";
  } else {
    document.getElementById("availability2").textContent = "Available";
  }
}
setInterval(availability2, 1000);


function productsearch3() {

  let arr  = localStorage.getItem("searchdata")
  let dit = JSON.parse(arr);
  let pid3 = document.getElementById("pid3").value = dit[2].product_id;
  document.getElementById("txtarea2").value = dit[2].product_name;
  //Active Queue
  let headersList = {
    "X-Requested-With": "XMLHttp",
    "Content-Type": "application/json",
  };
  fetch("http://127.0.0.1:8000/api/ssd/product/" + pid3, {
    method: "GET",
    headers: headersList,
  })
    .then((response) => response.json())
    .then((json) => {
      localStorage.setItem("qty3", json.inventory_quantity);
      localStorage.setItem("varId3", json.variant_id);
    });

  }

function availability3(){
  let quantity3 = localStorage.getItem("qty3");
  let pqty3 = parseInt(document.getElementById("quantity3").value);
  if (quantity3 == 0) {
    document.getElementById("availability3").textContent = "Unavailable";
  } else if (quantity3 < pqty3) {
    document.getElementById("availability3").textContent = "Insufficient";
  } else {
    document.getElementById("availability3").textContent = "Available";
  }
}
setInterval(availability3, 1000);






function order() {
  var url = "http://127.0.0.1:8000/api/ssd/products/order";
  let pqty1 = parseInt(document.getElementById("quantity1").value);
  var varId1 = parseInt(localStorage.getItem("varId1"));
  let pqty2 = parseInt(document.getElementById("quantity2").value);
  var varId2 = parseInt(localStorage.getItem("varId2"));
  let pqty3 = parseInt(document.getElementById("quantity3").value);
  var varId3 = parseInt(localStorage.getItem("varId3"));

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-Requested-With", "XMLHttp");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var urlResponse = xhr.responseText;
      window.open(urlResponse);
      // var invoice_url = urlResponse.invoice_url.value;
      // window.open(invoice_url);
    }
  };

  var data3 = `{
    "full_name": {
      "firstname": "Ferl John",
      "middlename": "Dacdac",
      "surname": "Javier",
      "affix": ""
    },
    "gender": "Male",
    "date_of_birth": "1994-12-17",
    "email": "xmaple@gmail.com",
    "contact_number": "09336199624",
    "address": "O 1-7 BistekVille 2 Brgy, Kaligayahan Novaliches Quezon City, 1124",
    "draft_order": {
      "line_items": [
        {
          "variant_id":${varId1},
          "quantity": ${pqty1}
        }
        ,
        {
          "variant_id":${varId2},
          "quantity": ${pqty2}
        },
        {
          "variant_id":${varId3},
          "quantity": ${pqty3}
        },
        {
          "variant_id":44016407511334,
          "quantity": 12
        }
        ,
        {
          "variant_id":44016396173606,
          "quantity": 23
        },
        {
          "variant_id":44016410231078,
          "quantity": 4
        }
      ]
    },
    "doctors_full_name": {
      "firstname": "Juan",
      "middlename": "Conchito",
      "surname": "Dela Cruz",
      "affix": "Dr"
    },
    "prc_number": "123992239003",
    "provider": {
      "provider_name": "Maxicare",
      "card_number": "003-2233-9222"
    }
  }`;
  
  xhr.send(data3);
}
