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
/** ##Sleep function*/
productsearch1();
productsearch2();
productsearch3();
function productsearch1() {
  let quantity1 = localStorage.getItem("qty1");
  let pid1 = document.getElementById("pid1").value;
  let pqty1 = parseInt(document.getElementById("quantity1").value);
  // let pid= 7996083306790;
  //Active Queue
  let headersList = {
    "X-Requested-With": "XMLHttp",
    "Content-Type": "application/json",
  };
  fetch("http://127.0.0.1:8000/api/product/" + pid1, {
    method: "GET",
    headers: headersList,
  })
    .then((response) => response.json())
    .then((json) => {
      localStorage.setItem("qty1", json.variants[0].inventory_quantity);
      localStorage.setItem("varId1", json.variants[0].id);
    });

  sleep(460);

  if (quantity1 == 0) {
    document.getElementById("availability1").textContent = "Unavailable";
  } else if (quantity1 < pqty1) {
    document.getElementById("availability1").textContent = "Insufficient";
  } else {
    document.getElementById("availability1").textContent = "Available";
  }
}

function productsearch2() {
  let quantity2 = localStorage.getItem("qty2");
  let pid2 = document.getElementById("pid2").value;
  let pqty2 = parseInt(document.getElementById("quantity2").value);
  // let pid= 7996083306790;
  //Active Queue
  let headersList = {
    "X-Requested-With": "XMLHttp",
    "Content-Type": "application/json",
  };
  fetch("http://127.0.0.1:8000/api/product/" + pid2, {
    method: "GET",
    headers: headersList,
  })
    .then((response) => response.json())
    .then((json) => {
      localStorage.setItem("qty2", json.variants[0].inventory_quantity);
      localStorage.setItem("varId2", json.variants[0].id);
    });

  sleep(460);

  if (quantity2 == 0) {
    document.getElementById("availability2").textContent = "Unavailable";
  } else if (quantity2 < pqty2) {
    document.getElementById("availability2").textContent = "Insufficient";
  } else {
    document.getElementById("availability2").textContent = "Available";
  }
}

function productsearch3() {
  let quantity3 = localStorage.getItem("qty3");
  let pid3 = document.getElementById("pid3").value;
  let pqty3 = parseInt(document.getElementById("quantity3").value);
  // let pid= 7996083306790;
  //Active Queue
  let headersList = {
    "X-Requested-With": "XMLHttp",
    "Content-Type": "application/json",
  };
  fetch("http://127.0.0.1:8000/api/product/" + pid3, {
    method: "GET",
    headers: headersList,
  })
    .then((response) => response.json())
    .then((json) => {
      localStorage.setItem("qty3", json.variants[0].inventory_quantity);
      localStorage.setItem("varId3", json.variants[0].id);
    });

  sleep(460);

  if (quantity3 == 0) {
    document.getElementById("availability3").textContent = "Unavailable";
  } else if (quantity3 < pqty3) {
    document.getElementById("availability3").textContent = "Insufficient";
  } else {
    document.getElementById("availability3").textContent = "Available";
  }
}

function order() {
  var url = "http://127.0.0.1:8000/api/products/order";
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
  xhr.setRequestHeader(
    "X-Shopify-Access-Token",
    "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"
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
    }
  };

  var data = ` {   
                 "email":"xmaple@gmail.com",
                 "name":"xample",
                 "note":"xample",
                 "draft_order": {
                       "line_items": [
                          {
                           "variant_id": ${varId1},
                           "quantity": ${pqty1}
                          },
                          {
                            "variant_id": ${varId2},
                            "quantity": ${pqty2}
                           },
                           {
                            "variant_id": ${varId3},
                            "quantity": ${pqty3}
                           }
                       ]
                   }
          }`;

  sleep(10);
  xhr.send(data);
}