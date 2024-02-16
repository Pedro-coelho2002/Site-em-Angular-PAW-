function countTickets() {
  var countInfantil = 0,
    countJuvenil = 0,
    countAdulto = 0,
    countSenior = 0;
  // Get the current counts of each ticket type
  if (document.getElementById("countInfantil") != null) {
    countInfantil = Number(document.getElementById("countInfantil").value);
  }
  if (document.getElementById("countJuvenil") != null) {
    countJuvenil = Number(document.getElementById("countJuvenil").value);
  }
  if (document.getElementById("countAdulto") != null) {
    countAdulto = Number(document.getElementById("countAdulto").value);
  }
  if (document.getElementById("countSenior") != null) {
    countSenior = Number(document.getElementById("countSenior").value);
  }

  return countInfantil + countJuvenil + countAdulto + countSenior;
}

function verifyCountTicket(maxTickets) {
  var count = countTickets();

  // Check if the total count exceeds the maximum allowed
  if (count > maxTickets) {
    alert(
      `O número máximo de bilhetes para este evento é ${maxTickets}. Por favor, escolha uma quantidade menor.`
    );
    document.getElementById("countInfantil").value = null;
    document.getElementById("countJuvenil").value = null;
    document.getElementById("countAdulto").value = null;
    document.getElementById("countSenior").value = null;

    // Set the focus back to the first input field
    document.getElementById("countInfantil").focus();
    return false;
  }

  // If the count is valid, return true to allow the form to be submitted
  return true;
}

function updateTotalPrice() {
  var priceInfantil = 0;
  var countInfantil = 0;
  var priceJuvenil = 0;
  var countJuvenil = 0;
  var priceAdulto = 0;
  var countAdulto = 0;
  var priceSenior = 0;
  var countSenior = 0;

  console.log(document.getElementById("priceInfantil"));
  console.log(document.getElementById("priceJuvenil"));
  console.log(document.getElementById("priceAdulto"));
  console.log(document.getElementById("priceSenior"));

  if (document.getElementById("priceInfantil") !== null) {
    priceInfantil = document.getElementById("priceInfantil").innerHTML;
    countInfantil = document.getElementById("countInfantil").value;
  }
  if (document.getElementById("priceJuvenil") !== null) {
    priceJuvenil = document.getElementById("priceJuvenil").innerHTML;
    countJuvenil = document.getElementById("countJuvenil").value;
  }

  if (document.getElementById("priceAdulto") !== null) {
    priceAdulto = document.getElementById("priceAdulto").innerHTML;
    countAdulto = document.getElementById("countAdulto").value;
  }
  if (document.getElementById("priceSenior") !== null) {
    priceSenior = document.getElementById("priceSenior").innerHTML;
    countSenior = document.getElementById("countSenior").value;
  }

  var preco =
    priceInfantil * countInfantil +
    priceJuvenil * countJuvenil +
    priceAdulto * countAdulto +
    priceSenior * countSenior;

  document.getElementById("totalPrice").innerHTML = preco;
  document.getElementById("totalPriceInput").value = preco;
}

if (document.getElementById("countInfantil")) {
  document
    .getElementById("countInfantil")
    .addEventListener("change", function () {
      verifyCountTicket(maxTickets);
      updateTotalPrice();
    });
}

if (document.getElementById("countJuvenil")) {
  document
    .getElementById("countJuvenil")
    .addEventListener("change", function () {
      verifyCountTicket(maxTickets);
      updateTotalPrice();
    });
}

if (document.getElementById("countAdulto")) {
  document
    .getElementById("countAdulto")
    .addEventListener("change", function () {
      verifyCountTicket(maxTickets);
      updateTotalPrice();
    });
}

if (document.getElementById("countSenior")) {
  document
    .getElementById("countSenior")
    .addEventListener("change", function () {
      verifyCountTicket(maxTickets);
      updateTotalPrice();
    });
}

/**
 * Método para validar eventos
 */
function validateEvento() {
  console.log("EVENTO validado");
  validateFirstDate();
  validateEndDate();
}

function validateFirstDate() {
  var dataAtual = new Date();
  var startDateTimeDoc = document.getElementById("startDateTime");
  var startDateTmp = new Date(Date.parse(startDateTimeDoc.value.toString()));
  console.log("Data atual: " + dataAtual.getTime() / 3600000 + " horas");
  console.log("Start date: " + startDateTmp.getTime() / 3600000 + " horas");

  if (dataAtual.getTime() > startDateTmp.getTime()) {
    console.log("Invalid start date!! 1");
    startDateTimeDoc.setCustomValidity("Data de início inválida!!");
    console.log("Invalid start date!! 2");
  } else {
    startDateTimeDoc.setCustomValidity("");
  }
}

function validateEndDate() {
  var dataAtual = new Date();
  var startDateTimeDoc = document.getElementById("startDateTime");
  var startDateTmp = new Date(Date.parse(startDateTimeDoc.value.toString()));
  var endDateTimeDoc = document.getElementById("endDateTime");
  var endDateTmp = new Date(Date.parse(endDateTimeDoc.value.toString()));
  console.log("Data atual: " + dataAtual.getTime() / 3600000 + " horas");
  console.log("End date: " + endDateTmp.getTime() / 3600000 + " horas");

  if (
    dataAtual.getTime() > endDateTmp.getTime() ||
    endDateTmp.getTime() < startDateTmp.getTime()
  ) {
    console.log("Invalid end date!! 1");
    endDateTimeDoc.setCustomValidity("Data de fim inválida!!");
    console.log("Invalid end date!! 2");
  } else {
    endDateTimeDoc.setCustomValidity("");
  }
}

function checkTicketInfantilFunction() {
  // Obter a checkbox correspondente
  var checkBox = document.getElementById("checkTicketInfantil");

  // Obter as duas opções de vizualização
  var text1 = document.getElementById("priceInfantil1");
  var text2 = document.getElementById("priceInfantil2");

  // Se a checkbox é selecionada, é apresentado o input para colocar o valor.
  // Caso contrário apresenta a mensagem "Sem Bilhetes"
  if (checkBox.checked == true) {
    console.log("escolheu 'Infantil'");
    text1.style.display = "block";
    text2.style.display = "none";
    document.getElementById("priceInfantil").required = true;
  } else {
    console.log("não escolheu 'Infantil'");
    text1.style.display = "none";
    text2.style.display = "block";
    document.getElementById("priceInfantil").value = null;
    document.getElementById("priceInfantil").required = false;
  }
}

function checkTicketJuvenilFunction() {
  var checkBox = document.getElementById("checkTicketJuvenil");

  var text1 = document.getElementById("priceJuvenil1");
  var text2 = document.getElementById("priceJuvenil2");

  if (checkBox.checked == true) {
    console.log("escolheu 'Juvenil'");
    text1.style.display = "block";
    text2.style.display = "none";
    document.getElementById("priceJuvenil").required = true;
  } else {
    console.log("não escolheu 'Juvenil'");
    text1.style.display = "none";
    text2.style.display = "block";
    document.getElementById("priceJuvenil").value = null;
    document.getElementById("priceJuvenil").required = false;
  }
}

function checkTicketAdultFunction() {
  var checkBox = document.getElementById("checkTicketAdult");

  var text1 = document.getElementById("priceAdult1");
  var text2 = document.getElementById("priceAdult2");

  if (checkBox.checked == true) {
    console.log("escolheu 'Adult'");
    text1.style.display = "block";
    text2.style.display = "none";
    document.getElementById("priceAdulto").required = true;
  } else {
    console.log("não escolheu 'Adult'");
    text1.style.display = "none";
    text2.style.display = "block";
    document.getElementById("priceAdulto").value = null;
    document.getElementById("priceAdulto").required = false;
  }
}

function checkTicketSeniorFunction() {
  var checkBox = document.getElementById("checkTicketSenior");

  var text1 = document.getElementById("priceSenior1");
  var text2 = document.getElementById("priceSenior2");

  if (checkBox.checked == true) {
    console.log("escolheu 'Senior'");
    text1.style.display = "block";
    text2.style.display = "none";
    document.getElementById("priceSenior").required = true;
  } else {
    console.log("não escolheu 'Senior'");
    text1.style.display = "none";
    text2.style.display = "block";
    document.getElementById("priceSenior").value = null;
    document.getElementById("priceSenior").required = false;
  }
}

function loadCheckbox(precoInfantil, precoJuvenil, precoAdulto, precoSenior) {
  console.log("Carrega checkbox");
  console.log(precoInfantil);
  console.log(precoJuvenil);
  console.log(precoAdulto);
  console.log(precoSenior);

  var checkBoxInfantil = document.getElementById("checkTicketInfantil");
  var checkBoxJuvenil = document.getElementById("checkTicketJuvenil");
  var checkBoxAdult = document.getElementById("checkTicketAdult");
  var checkBoxSenior = document.getElementById("checkTicketSenior");

  if (precoInfantil != "") {
    checkBoxInfantil.checked = true;
    checkTicketInfantilFunction();
  }

  if (precoJuvenil != "") {
    checkBoxJuvenil.checked = true;
    checkTicketJuvenilFunction();
  }

  if (precoAdulto != "") {
    checkBoxAdult.checked = true;
    checkTicketAdultFunction();
  }

  if (precoSenior != "") {
    checkBoxSenior.checked = true;
    checkTicketSeniorFunction();
  }
}

function loadView(startDate, endDate) {
  moment.locale("pt-br");
  var dataStart = moment(startDate).format("LLL");
  document.getElementById("startDate").innerHTML += dataStart;

  var dataEnd = moment(endDate).format("LLL");
  document.getElementById("endDate").innerHTML += dataEnd;
}

function searchEvents() {
  var countEvents = 0;

  // Obtém o valor digitado na barra de pesquisa
  var query = document.querySelector('input[name="query"]').value.toLowerCase();

  // Obtém todos os elementos de card de evento
  var eventCards = document.getElementsByClassName("card");

  // Percorre os elementos de card de evento
  for (var i = 0; i < eventCards.length; i++) {
    var eventName = eventCards[i].querySelector("h3").innerText.toLowerCase();

    // Verifica se o nome do evento contém a query de pesquisa
    if (eventName.includes(query)) {
      eventCards[i].style.display = "block"; // Exibe o card de evento
      countEvents++;
    } else {
      eventCards[i].style.display = "none"; // Oculta o card de evento
    }
  }

  // se não existirem eventos com o nome imserido na barra de pesquisas
  if (countEvents == 0) {
    var search = document.getElementById("search-input");
    alert("Não existe esse nome !!");

    search.value = null;
    location.reload();
  }
}
