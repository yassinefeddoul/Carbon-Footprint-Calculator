const IP = "http://127.0.0.1:5000";
// MAIN FUNCTIONS
function notification(contentContainer, divClass, content, duration = 3000) {
  document.getElementById(contentContainer).innerHTML = content;
  document.querySelector(divClass).style.opacity = "1";
  document.querySelector(divClass).style.animation =
    "bounceInRight 1s ease-out";
  setTimeout(() => {
    document.querySelector(divClass).style.animation =
      "bounceOutRight 1s ease-in";
    setTimeout(() => {
      document.querySelector(divClass).style.opacity = "0";
    }, 500);
  }, duration);
}

function disapear(idDropBtn, idDropElm) {
  var dropdowns = document.getElementById(idDropElm);
  var i;
  if (dropdowns.classList.contains("show")) {
    dropdowns.style.animation = "";
    dropdowns.style.animation = "fadeOutUp 0.5s";
    document.getElementById(idDropBtn).classList.toggle("rotate180");

    setTimeout(() => {
      dropdowns.classList.remove("show");
      dropdowns.style.animation = "";
    }, 500);
  }
}

function disapearProd(idDropBtn, idDropElm) {
  var dropdowns = document.getElementById(idDropElm);
  var i;
  if (dropdowns.classList.contains("showProduct")) {
    dropdowns.style.animation = "";
    dropdowns.style.animation = "fadeOutUp 0.5s";
    document.getElementById(idDropBtn).classList.toggle("rotate180");

    setTimeout(() => {
      dropdowns.classList.remove("showProduct");
      dropdowns.style.animation = "";
    }, 500);
  }
}

function disapearUp(idDropBtn, idDropElm) {
  var dropdowns = document.getElementById(idDropElm);
  var i;
  if (dropdowns.classList.contains("showUp")) {
    dropdowns.style.animation = "";
    dropdowns.style.animation = "fadeOutDown 0.5s";
    document.getElementById(idDropBtn).classList.toggle("rotate180");

    setTimeout(() => {
      dropdowns.classList.remove("showUp");
      dropdowns.style.animation = "";
    }, 500);
  }
}

function disapearfrombtn(idDropBtn, idDropElm) {
  var dropdowns = document.getElementById(idDropElm);
  var i;
  if (dropdowns.classList.contains("show")) {
    dropdowns.style.animation = "";
    dropdowns.style.animation = "fadeOutUp 0.5s";
    document.getElementById(idDropBtn).classList.toggle("rotate180");
    setTimeout(() => {
      dropdowns.classList.remove("show");
      dropdowns.style.animation = "";
    }, 400);
  } else {
    rotateDown(idDropBtn, idDropElm);
  }
}

function disapearfrombtnProd(idDropBtn, idDropElm) {
  var dropdowns = document.getElementById(idDropElm);
  var i;
  if (dropdowns.classList.contains("showProduct")) {
    dropdowns.style.animation = "";
    dropdowns.style.animation = "fadeOutUp 0.5s";
    document.getElementById(idDropBtn).classList.toggle("rotate180");
    setTimeout(() => {
      dropdowns.classList.remove("showProduct");
      dropdowns.style.animation = "";
    }, 400);
  } else {
    rotateProd(idDropBtn, idDropElm);
  }
}

function disapearfrombtnUp(idDropBtn, idDropElm) {
  var dropdowns = document.getElementById(idDropElm);
  var i;
  if (dropdowns.classList.contains("showUp")) {
    dropdowns.style.animation = "";
    dropdowns.style.animation = "fadeOutDown 0.5s";
    document.getElementById(idDropBtn).classList.toggle("rotate180");
    setTimeout(() => {
      dropdowns.classList.remove("showUp");
      dropdowns.style.animation = "";
    }, 500);
  } else {
    rotateUp(idDropBtn, idDropElm);
  }
}

function fillProdData(prodDataObj) {
  sector = prodDataObj.sector;
  domain = prodDataObj.domain;
  activitie = prodDataObj.activitie;
  type = prodDataObj.type;
  subtype = prodDataObj.subtype;
  names = prodDataObj.name;

  dataHTML = "";
  for (elm of sector) {
    dataHTML += '<div class="elm">' + elm + "</div>";
  }
  document.getElementById("dropelm1").innerHTML = dataHTML;

  dataHTML = "";
  for (elm of domain) {
    dataHTML += '<div class="elm">' + elm + "</div>";
  }
  document.getElementById("dropelm2").innerHTML = dataHTML;

  dataHTML = "";
  for (elm of activitie) {
    dataHTML += '<div class="elm">' + elm + "</div>";
  }
  document.getElementById("dropelm3").innerHTML = dataHTML;

  dataHTML = "";
  for (elm of type) {
    dataHTML += '<div class="elm">' + elm + "</div>";
  }
  document.getElementById("dropelm4").innerHTML = dataHTML;

  dataHTML = "";
  for (elm of subtype) {
    dataHTML += '<div class="elm">' + elm + "</div>";
  }
  document.getElementById("dropelm5").innerHTML = dataHTML;

  dataHTML = "";
  for (elm of names) {
    dataHTML += '<div class="elm">' + elm + "</div>";
  }
  document.getElementById("dropelm6").innerHTML = dataHTML;
}

function getProdData() {
  let sector = document.getElementById("dropSelected1").innerHTML;
  let domain = document.getElementById("dropSelected2").innerHTML;
  let activitie = document.getElementById("dropSelected3").innerHTML;
  let type = document.getElementById("dropSelected4").innerHTML;
  let subtype = document.getElementById("dropSelected5").innerHTML;
  let name = document.getElementById("dropSelected6").innerHTML;
  let prodData = {
    sector: sector,
    domain: domain,
    activitie: activitie,
    type: type,
    subtype: subtype,
    name: name,
  };
  return prodData;
}
// ___________________________________________________________________________________

document.getElementById("btnNewProd").addEventListener("click", function () {
  let disp = document.getElementById("newProduct-entry").style.display;
  let animateOut = "fadeOutUp";
  let animateIn = "fadeInDown";
  if (disp == "flex") {
    disp = "none";
    animate = "fadeOutUp";
    document.getElementById("newProduct-entry").style.animation = "";
    document.getElementById("newProduct-entry").style.animation =
      animateOut + " 0.5s";
    setTimeout(function () {
      document.getElementById("newProduct-entry").style.display = disp;
    }, 400);
  } else {
    disp = "flex";
    document.getElementById("newProduct-entry").style.display = disp;
    document.getElementById("newProduct-entry").style.animation = "";
    document.getElementById("newProduct-entry").style.animation =
      animateIn + " 0.5s";
  }
});

document.getElementById("btnNewProdOK").addEventListener("click", function () {
  let prodTxt = document.querySelector(".ipnut-newProduct").value;
  console.log(prodTxt);
  document.querySelector(".prod-caracteristics-tab").innerHTML =
    "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
  document.getElementById("CFPsum").innerHTML = "Carbon Footprint = ";
  if (prodTxt == "") {
    notification(
      "notifContLanding",
      ".notif--landing",
      "Fill Out The Product Section",
      3000
    );
  } else {
    document.querySelector(".blacked--landing").style.animation =
      "bounceOutDown 1s";
    setTimeout(() => {
      document.querySelector(".blacked--landing").style.animation = "";
      document.querySelector(".blacked--landing").style.display = "none";
      document.querySelector(".blacked--newProduct").style.display = "flex";
      document.getElementById("returnBtn").style.display = "flex";
      console.log(document.querySelector(".ipnut-newProduct").value);
    }, 700);
    document.querySelector(".container-caption--product").innerHTML = prodTxt;
  }
});

function rotateDown(idDropBtn, idDropelm) {
  document.getElementById(idDropBtn).classList.toggle("rotate180");
  document.getElementById(idDropelm).classList.toggle("show");
}
function rotateUp(idDropBtn, idDropelm) {
  document.getElementById(idDropBtn).classList.toggle("rotate180");
  document.getElementById(idDropelm).classList.toggle("showUp");
}
function rotateProd(idDropBtn, idDropelm) {
  document.getElementById(idDropBtn).classList.toggle("rotate180");
  document.getElementById(idDropelm).classList.toggle("showProduct");
}

document.getElementById("dropBtn1").addEventListener("click", function () {
  let categorie = document.querySelector(".cat1").innerHTML;
  console.log(categorie);

  let options = {
    method: "POST",
    body: JSON.stringify({ categorie: categorie }),
    credentials: "same-origin",
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json",
    }),
  };
  let uri;
  let data = ["Achats de services ", "DATA2", "DATA3"];
  let dataHTML = "";

  for (elm of data) {
    dataHTML += '<div class="elm">' + elm + "</div>";
  }
  // document.getElementById("dropelm1").innerHTML = dataHTML;
  disapearfrombtn("dropBtn1", "dropelm1");
  setTimeout(() => {
    var items = document.getElementById("dropelm1").childNodes;
    for (let i = 0; i < items.length; i++) {
      items[i].onclick = function () {
        // console.log(items[i].innerHTML);
        document.getElementById("dropSelected1").innerHTML = "NULL";
        document.getElementById("dropSelected2").innerHTML = "NULL";
        document.getElementById("dropSelected3").innerHTML = "NULL";
        document.getElementById("dropSelected4").innerHTML = "NULL";
        document.getElementById("dropSelected5").innerHTML = "NULL";
        document.getElementById("dropSelected6").innerHTML = "NULL";

        document.getElementById("dropSelected1").innerHTML = items[i].innerHTML;

        let prodData = getProdData();
        console.log(prodData);
        let uri = IP + "/dropBox";
        let options = {
          method: "POST",
          body: JSON.stringify(prodData),
          credentials: "same-origin",
          cache: "no-cache",
          headers: new Headers({
            "content-type": "application/json",
          }),
        };

        fetch(uri, options)
          .then(function (response) {
            return response.json();
          })
          .then(function (dataPordObj) {
            // console.log(dataPordObj);
            fillProdData(dataPordObj);
            if (typeof dataPordObj.coef == undefined) {
              document.querySelector(".cat7").innerHTML = "Quantity | Coef = ";
            } else {
              document.querySelector(".cat7").innerHTML =
                "Quantity | Coef = " + dataPordObj.coef;
            }
            document.getElementById("dropBtn7").innerHTML = dataPordObj.unit;
          });
      };
    }
  }, 500);
});

document.getElementById("dropBtn2").addEventListener("click", function () {
  let uri;
  let data = ["DATA1", "DATA2", "DATA3"];
  let dataHTML = "";

  // for (elm of data) {
  //   dataHTML += '<div class="elm">' + elm + "</div>";
  // }
  // document.getElementById("dropelm2").innerHTML = dataHTML;

  disapearfrombtn("dropBtn2", "dropelm2");
  setTimeout(() => {
    var items = document.getElementById("dropelm2").childNodes;
    for (let i = 0; i < items.length; i++) {
      items[i].onclick = function () {
        console.log(items[i].innerHTML);
        document.getElementById("dropSelected2").innerHTML = "NULL";
        document.getElementById("dropSelected3").innerHTML = "NULL";
        document.getElementById("dropSelected4").innerHTML = "NULL";
        document.getElementById("dropSelected5").innerHTML = "NULL";
        document.getElementById("dropSelected6").innerHTML = "NULL";

        document.getElementById("dropSelected2").innerHTML = items[i].innerHTML;

        let prodData = getProdData();
        console.log(prodData);
        let uri = IP + "/dropBox";
        let options = {
          method: "POST",
          body: JSON.stringify(prodData),
          credentials: "same-origin",
          cache: "no-cache",
          headers: new Headers({
            "content-type": "application/json",
          }),
        };

        fetch(uri, options)
          .then(function (response) {
            return response.json();
          })
          .then(function (dataPordObj) {
            // console.log(dataPordObj);
            console.log(dataPordObj.coef);
            fillProdData(dataPordObj);
            document.getElementById("dropBtn7").innerHTML = dataPordObj.unit;
            if (typeof dataPordObj.coef == undefined) {
              document.querySelector(".cat7").innerHTML = "Quantity | Coef = ";
            } else {
              document.querySelector(".cat7").innerHTML =
                "Quantity | Coef = " + dataPordObj.coef;
            }
          });
      };
    }
  }, 500);
});

document.getElementById("dropBtn3").addEventListener("click", function () {
  let uri;
  let data = ["DATA1", "DATA2", "DATA3"];
  let dataHTML = "";

  // for (elm of data) {
  //   dataHTML += '<div class="elm">' + elm + "</div>";
  // }
  // document.getElementById("dropelm3").innerHTML = dataHTML;

  disapearfrombtn("dropBtn3", "dropelm3");
  setTimeout(() => {
    var items = document.getElementById("dropelm3").childNodes;
    for (let i = 0; i < items.length; i++) {
      items[i].onclick = function () {
        console.log(items[i].innerHTML);
        document.getElementById("dropSelected3").innerHTML = "NULL";
        document.getElementById("dropSelected4").innerHTML = "NULL";
        document.getElementById("dropSelected5").innerHTML = "NULL";
        document.getElementById("dropSelected6").innerHTML = "NULL";

        document.getElementById("dropSelected3").innerHTML = items[i].innerHTML;
        let prodData = getProdData();
        console.log(prodData);
        let uri = IP + "/dropBox";
        let options = {
          method: "POST",
          body: JSON.stringify(prodData),
          credentials: "same-origin",
          cache: "no-cache",
          headers: new Headers({
            "content-type": "application/json",
          }),
        };

        fetch(uri, options)
          .then(function (response) {
            return response.json();
          })
          .then(function (dataPordObj) {
            // console.log(dataPordObj);
            console.log(dataPordObj.coef);
            fillProdData(dataPordObj);
            if (typeof dataPordObj.coef == undefined) {
              document.querySelector(".cat7").innerHTML = "Quantity | Coef = ";
            } else {
              document.querySelector(".cat7").innerHTML =
                "Quantity | Coef = " + dataPordObj.coef;
            }
            document.getElementById("dropBtn7").innerHTML = dataPordObj.unit;
          });
      };
    }
  }, 500);
});

document.getElementById("dropBtn4").addEventListener("click", function () {
  let uri;
  let data = ["DATA1", "DATA2", "DATA3"];
  let dataHTML = "";

  for (elm of data) {
    dataHTML += '<div class="elm">' + elm + "</div>";
  }
  // document.getElementById("dropelm4").innerHTML = dataHTML;

  disapearfrombtn("dropBtn4", "dropelm4");
  setTimeout(() => {
    var items = document.getElementById("dropelm4").childNodes;
    for (let i = 0; i < items.length; i++) {
      items[i].onclick = function () {
        console.log(items[i].innerHTML);
        document.getElementById("dropSelected4").innerHTML = "NULL";
        document.getElementById("dropSelected5").innerHTML = "NULL";
        document.getElementById("dropSelected6").innerHTML = "NULL";

        document.getElementById("dropSelected4").innerHTML = items[i].innerHTML;

        let prodData = getProdData();
        console.log(prodData);
        let uri = IP + "/dropBox";
        let options = {
          method: "POST",
          body: JSON.stringify(prodData),
          credentials: "same-origin",
          cache: "no-cache",
          headers: new Headers({
            "content-type": "application/json",
          }),
        };

        fetch(uri, options)
          .then(function (response) {
            return response.json();
          })
          .then(function (dataPordObj) {
            // console.log(dataPordObj);
            console.log(dataPordObj.coef);
            fillProdData(dataPordObj);
            if (typeof dataPordObj.coef == undefined) {
              document.querySelector(".cat7").innerHTML = "Quantity | Coef = ";
            } else {
              document.querySelector(".cat7").innerHTML =
                "Quantity | Coef = " + dataPordObj.coef;
            }
            document.getElementById("dropBtn7").innerHTML = dataPordObj.unit;
          });
      };
    }
  }, 500);
});

document.getElementById("dropBtn5").addEventListener("click", function () {
  let uri;
  let data = ["DATA1", "DATA2", "DATA3"];
  let dataHTML = "";

  for (elm of data) {
    dataHTML += '<div class="elm">' + elm + "</div>";
  }
  // document.getElementById("dropelm5").innerHTML = dataHTML;

  disapearfrombtn("dropBtn5", "dropelm5");
  setTimeout(() => {
    var items = document.getElementById("dropelm5").childNodes;
    for (let i = 0; i < items.length; i++) {
      items[i].onclick = function () {
        console.log(items[i].innerHTML);
        document.getElementById("dropSelected5").innerHTML = "NULL";
        document.getElementById("dropSelected6").innerHTML = "NULL";

        document.getElementById("dropSelected5").innerHTML = items[i].innerHTML;

        let prodData = getProdData();
        console.log(prodData);
        let uri = IP + "/dropBox";
        let options = {
          method: "POST",
          body: JSON.stringify(prodData),
          credentials: "same-origin",
          cache: "no-cache",
          headers: new Headers({
            "content-type": "application/json",
          }),
        };

        fetch(uri, options)
          .then(function (response) {
            return response.json();
          })
          .then(function (dataPordObj) {
            // console.log(dataPordObj);
            fillProdData(dataPordObj);
            console.log(dataPordObj.coef);
            if (typeof dataPordObj.coef == undefined) {
              document.querySelector(".cat7").innerHTML = "Quantity | Coef = ";
            } else {
              document.querySelector(".cat7").innerHTML =
                "Quantity | Coef = " + dataPordObj.coef;
            }
            document.getElementById("dropBtn7").innerHTML = dataPordObj.unit;
          });
      };
    }
  }, 500);
});

document.getElementById("dropBtn6").addEventListener("click", function () {
  let uri;
  let data = ["DATA1", "DATA2", "DATA3"];
  let dataHTML = "";

  for (elm of data) {
    dataHTML += '<div class="elm">' + elm + "</div>";
  }
  // document.getElementById("dropelm6").innerHTML = dataHTML;

  disapearfrombtnUp("dropBtn6", "dropelm6");
  setTimeout(() => {
    var items = document.getElementById("dropelm6").childNodes;
    for (let i = 0; i < items.length; i++) {
      items[i].onclick = function () {
        console.log(items[i].innerHTML);

        document.getElementById("dropSelected6").innerHTML = items[i].innerHTML;

        let prodData = getProdData();
        console.log(prodData);
        let uri = IP + "/dropBox";
        let options = {
          method: "POST",
          body: JSON.stringify(prodData),
          credentials: "same-origin",
          cache: "no-cache",
          headers: new Headers({
            "content-type": "application/json",
          }),
        };

        fetch(uri, options)
          .then(function (response) {
            return response.json();
          })
          .then(function (dataPordObj) {
            // console.log(dataPordObj);
            fillProdData(dataPordObj);
            console.log(dataPordObj.unit);
            console.log(dataPordObj.coef);
            if (typeof dataPordObj.coef == undefined) {
              document.querySelector(".cat7").innerHTML = "Quantity | Coef = ";
            } else {
              document.querySelector(".cat7").innerHTML =
                "Quantity | Coef = " + dataPordObj.coef;
            }
            document.getElementById("dropBtn7").innerHTML = dataPordObj.unit;
          });
      };
    }
  }, 500);
});

window.onclick = function (event) {
  if (!event.target.matches(".dropBtn")) {
    disapear("dropBtn1", "dropelm1");
    disapear("dropBtn2", "dropelm2");
    disapear("dropBtn3", "dropelm3");
    disapear("dropBtn4", "dropelm4");
    disapear("dropBtn5", "dropelm5");
    disapearUp("dropBtn6", "dropelm6");
    disapearProd("dropBtn8", "dropelm8");
  }
};

document.getElementById("dropBtn8").addEventListener("click", function () {
  let uri;
  let data = ["PRODUCT1", "PRODUCT2", "PRODUCT3"];
  let dataHTML = "";

  for (elm of data) {
    dataHTML += '<div class="elm">' + elm + "</div>";
  }
  // document.getElementById("dropelm8").innerHTML = dataHTML;

  disapearfrombtnProd("dropBtn8", "dropelm8");
  setTimeout(() => {
    var items = document.getElementById("dropelm8").childNodes;
    for (let i = 0; i < items.length; i++) {
      items[i].onclick = function () {
        console.log(items[i].innerHTML);
        document.getElementById("dropSelected8").innerHTML = items[i].innerHTML;
        let selectedProduct = items[i].innerHTML;
        let uri = IP + "/ExistingProd";
        let options = {
          method: "POST",
          body: JSON.stringify({ name: selectedProduct }),
          credentials: "same-origin",
          cache: "no-cache",
          headers: new Headers({
            "content-type": "application/json",
          }),
        };
        const tableBody = document.getElementById("tab2");
        fetch(uri, options)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            myList = data.td;
            cfp = data.sum;
            console.log(myList);
            let dataHtml = "";
            for (elm of myList) {
              dataHtml +=
                "<tr><td>" +
                elm.sector +
                "</td>" +
                "<td>" +
                elm.domain +
                "</td>" +
                "<td>" +
                elm.activitie +
                "</td>" +
                "<td>" +
                elm.type +
                "</td>" +
                "<td>" +
                elm.subtype +
                "</td>" +
                "<td>" +
                elm.nameP +
                "</td>" +
                "<td>" +
                elm.qty +
                "</td>" +
                "</tr>";
            }
            tableBody.innerHTML = dataHtml;
            document.getElementById("cfp2").innerHTML =
              "Carbon Footprint = " + data.sum;
          });
      };
    }
  }, 500);
});

window.onload = function () {
  document.querySelector(".prod-caracteristics-tab").innerHTML =
    "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";

  let prodData = getProdData();
  // console.log(prodData);
  let uri = IP + "/dropBox";
  let options = {
    method: "POST",
    body: JSON.stringify(prodData),
    credentials: "same-origin",
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json",
    }),
  };

  document.getElementById("dropSelected1").innerHTML = "NULL";
  document.getElementById("dropSelected2").innerHTML = "NULL";
  document.getElementById("dropSelected3").innerHTML = "NULL";
  document.getElementById("dropSelected4").innerHTML = "NULL";
  document.getElementById("dropSelected5").innerHTML = "NULL";
  document.getElementById("dropSelected6").innerHTML = "NULL";
  // document.getElementById("input-unit").value = NULL;

  fetch(uri, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataPordObj) {
      // console.log(dataPordObj);
      fillProdData(dataPordObj);
      if (typeof dataPordObj.coef == undefined) {
        document.querySelector(".cat7").innerHTML = "Quantity | Coef = ";
      } else {
        document.querySelector(".cat7").innerHTML =
          "Quantity | Coef = " + dataPordObj.coef;
      }
    });

  uri = IP + "/Prod";

  fetch(uri, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let products = data.prod;
      let dataHTML = "";
      for (elm of products) {
        dataHTML += '<div class="elm">' + elm + "</div>";
      }
      document.getElementById("dropelm8").innerHTML = dataHTML;
    });
};

document.getElementById("btnConfirm").addEventListener("click", function () {
  let cat1 = document.getElementById("dropSelected1").innerHTML;
  let cat2 = document.getElementById("dropSelected2").innerHTML;
  let cat3 = document.getElementById("dropSelected3").innerHTML;
  let cat4 = document.getElementById("dropSelected4").innerHTML;
  let cat5 = document.getElementById("dropSelected5").innerHTML;
  let cat6 = document.getElementById("dropSelected6").innerHTML;
  let cat7 = document.getElementById("input-unit").value;

  let catList = [cat1, cat2, cat3, cat4, cat5, cat6, cat7];
  let n = 0;
  for (elm of catList) {
    if (elm == "") {
      n = 1;
    }
  }
  if (n == 1) {
    notification(
      "notifContLanding",
      ".notif--landing",
      "They may be some Blank Sections",
      3000
    );
  } else {
    let dataHTML = "<tr>";
    let i = 0;
    for (elm of catList) {
      i += 1;
      if (i == 7) {
        let coef = document.querySelector(".cat7").innerHTML;
        coef = Number(coef.slice(18));
        dataHTML += "<td>" + Number(elm) * coef + "</td>";
      } else {
        dataHTML += "<td>" + elm + "</td>";
      }
    }

    dataHTML += "</tr>";
    const initval =
      "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    let htmlTable = document.querySelector(
      ".prod-caracteristics-tab"
    ).innerHTML;
    if (htmlTable == initval) {
      document.querySelector(".prod-caracteristics-tab").innerHTML = dataHTML;
    } else {
      document.querySelector(".prod-caracteristics-tab").innerHTML += dataHTML;
    }
    document.getElementById("dropSelected1").innerHTML = "NULL";
    document.getElementById("dropSelected2").innerHTML = "NULL";
    document.getElementById("dropSelected3").innerHTML = "NULL";
    document.getElementById("dropSelected4").innerHTML = "NULL";
    document.getElementById("dropSelected5").innerHTML = "NULL";
    document.getElementById("dropSelected6").innerHTML = "NULL";
    document.getElementById("input-unit").value = "";
    document.querySelector(".unit").innerHTML = "unity";
  }
});

document.getElementById("btnInitilize").addEventListener("click", function () {
  document.querySelector(".prod-caracteristics-tab").innerHTML =
    "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
  document.getElementById("CFPsum").innerHTML = "Carbon Footprint = ";
});

document
  .getElementById("btnExistingProd")
  .addEventListener("click", function () {
    document.querySelector(".blacked--landing").style.animation =
      "bounceOutDown 1s";
    document.getElementById("tab2").innerHTML =
      "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    document.getElementById("CFPsum").innerHTML = "Carbon Footprint = ";
    setTimeout(() => {
      document.querySelector(".blacked--landing").style.animation = "";
      document.querySelector(".blacked--landing").style.display = "none";
      document.querySelector(".blacked--existingProduct").style.display =
        "flex";
      document.getElementById("returnBtn").style.display = "flex";
    }, 700);
    // document.querySelector(".container-caption--product").innerHTML = prodTxt;
  });

document.getElementById("returnBtn").addEventListener("click", function () {
  let blackedNew = document.querySelector(".blacked--newProduct").style.display;
  // let blackedExist = document.querySelector(".blacked--existingProduct").style.display;
  if (blackedNew == "flex") {
    document.querySelector(".blacked--newProduct").style.animation =
      "bounceOutUp 1s";
    setTimeout(() => {
      document.querySelector(".blacked--newProduct").style.animation = "";
      document.querySelector(".blacked--newProduct").style.animation =
        "fadeInDown 0.5s";
      document.querySelector(".blacked--newProduct").style.display = "none";
      document.querySelector(".blacked--landing").style.display = "flex";
      document.getElementById("newProduct-entry").style.display = "none";
      document.getElementById("returnBtn").style.animation = "bounceOutLeft 1s";
      setTimeout(() => {
        document.getElementById("returnBtn").style.animation = "bounceIn 1s";
        document.getElementById("returnBtn").style.display = "none";
      }, 1000);
    }, 700);
  } else {
    document.querySelector(".blacked--existingProduct").style.animation =
      "bounceOutUp 1s";
    setTimeout(() => {
      document.querySelector(".blacked--existingProduct").style.animation = "";
      document.querySelector(".blacked--existingProduct").style.animation =
        "fadeInDown 0.5s";
      document.querySelector(".blacked--existingProduct").style.display =
        "none";
      document.querySelector(".blacked--landing").style.display = "flex";
      document.getElementById("returnBtn").style.animation = "bounceOutLeft 1s";
      setTimeout(() => {
        document.getElementById("returnBtn").style.animation = "bounceIn 1s";
        document.getElementById("returnBtn").style.display = "none";
      }, 1000);
    }, 700);
  }
});

document.getElementById("btnDone").addEventListener("click", function () {
  let bodyElm = document.getElementById("tab1");
  var tabElm = [];

  for (elm of bodyElm.children) {
    rowData2 = elm.children;
    var rowData = {
      sector: "",
      domain: "",
      activitie: "",
      type: "",
      subtype: "",
      name: "",
      qty: "",
    };
    rowData.sector = rowData2[0].innerHTML;
    rowData.domain = rowData2[1].innerHTML;
    rowData.activitie = rowData2[2].innerHTML;
    rowData.type = rowData2[3].innerHTML;
    rowData.subtype = rowData2[4].innerHTML;
    rowData.name = rowData2[5].innerHTML;
    rowData.qty = rowData2[6].innerHTML;
    tabElm.push(rowData);
  }
  console.log(tabElm);
  let productName = document.querySelector(".ipnut-newProduct").value;
  console.log(productName);
  let options = {
    method: "POST",
    body: JSON.stringify({ prodName: productName, dt: tabElm }),
    credentials: "same-origin",
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json",
    }),
  };

  let uri = IP + "/DoneNewProduct";

  fetch(uri, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById("CFPsum").innerHTML =
        "Carbon Footprint = " + data.sum;
    });

  uri = IP + "/Prod";

  fetch(uri, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let products = data.prod;
      let dataHTML = "";
      for (elm of products) {
        dataHTML += '<div class="elm">' + elm + "</div>";
      }
      document.getElementById("dropelm8").innerHTML = dataHTML;
    });
});
