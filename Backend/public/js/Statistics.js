function loadData(
  priceInfantil,
  priceJuvenil,
  priceAdulto,
  priceSenior,
  countInfantil,
  countJuvenil,
  countAdulto,
  countSenior,
  maxTickets
) {
  chart1(countInfantil, countJuvenil, countAdulto, countSenior);
  chart2(
    priceInfantil,
    priceJuvenil,
    priceAdulto,
    priceSenior,
    countInfantil,
    countJuvenil,
    countAdulto,
    countSenior
  );
  chart3(countInfantil, countJuvenil, countAdulto, countSenior, maxTickets);
  receita(
    priceInfantil,
    priceJuvenil,
    priceAdulto,
    priceSenior,
    countInfantil,
    countJuvenil,
    countAdulto,
    countSenior,
    maxTickets
  );
  chart4();
}

function receita(
  priceInfantil,
  priceJuvenil,
  priceAdulto,
  priceSenior,
  countInfantil,
  countJuvenil,
  countAdulto,
  countSenior,
  maxTickets
) {
  priceInfantil = Number(priceInfantil);
  priceJuvenil = Number(priceJuvenil);
  priceAdulto = Number(priceAdulto);
  priceSenior = Number(priceSenior);
  countInfantil = Number(countInfantil);
  countJuvenil = Number(countJuvenil);
  countAdulto = Number(countAdulto);
  countSenior = Number(countSenior);
  maxTickets = Number(maxTickets);

  var total =
    priceInfantil * countInfantil +
    priceJuvenil * countJuvenil +
    priceAdulto * countAdulto +
    priceSenior * countSenior;

  var valorRealizado = document.getElementById("receita");
  valorRealizado.innerHTML = "<h2>" + total + " €" + "</h2>";
}

function chart1(countInfantil, countJuvenil, countAdulto, countSenior) {
  var data = {
    labels: [
      "Bilhete Infantil",
      "Bilhete Juvenil",
      "Bilhete Adulto",
      "Bilhete Sênior",
    ],
    datasets: [
      {
        label: "Número de Bilhetes",
        data: [countInfantil, countJuvenil, countAdulto, countSenior],
        backgroundColor: ["rgba(30,144,255)"], // Cor de preenchimento das barras
      },
    ],
  };

  // Configurações do gráfico
  var options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Criação do gráfico
  var ctx = document.getElementById("Chart1").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options,
  });
}

function chart2(
  priceInfantil,
  priceJuvenil,
  priceAdulto,
  priceSenior,
  countInfantil,
  countJuvenil,
  countAdulto,
  countSenior
) {
  // Calculando os totais e as percentagens
  var totalPrice =
    priceInfantil * countInfantil +
    priceJuvenil * countJuvenil +
    priceAdulto * countAdulto +
    priceSenior * countSenior;
  var infantilPercentage = ((priceInfantil * countInfantil) / totalPrice) * 100;
  var juvenilPercentage = ((priceJuvenil * countJuvenil) / totalPrice) * 100;
  var adultoPercentage = ((priceAdulto * countAdulto) / totalPrice) * 100;
  var seniorPercentage = ((priceSenior * countSenior) / totalPrice) * 100;

  // Dados para o gráfico
  var data = {
    labels: ["Infantil", "Juvenil", "Adulto", "Senior"],
    datasets: [
      {
        data: [
          infantilPercentage,
          juvenilPercentage,
          adultoPercentage,
          seniorPercentage,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // Opções do gráfico
  var options = {
    responsive: true,
  };

  // Renderizando o gráfico
  var ctx = document.getElementById("Chart2").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "pie",
    data: data,
    options: options,
  });
}

function chart3(
  countInfantil,
  countJuvenil,
  countAdulto,
  countSenior,
  maxTickets
) {
  var sumTicketSell = 0;
  countInfantil = Number(countInfantil);
  countJuvenil = Number(countJuvenil);
  countAdulto = Number(countAdulto);
  countSenior = Number(countSenior);
  maxTickets = Number(maxTickets);
  sumTicketSell = countInfantil + countJuvenil + countAdulto + countSenior;

  var data = {
    labels: ["Vendido", "Não Vendido"],
    datasets: [
      {
        label: "Número de Bilhetes",
        data: [sumTicketSell, maxTickets - sumTicketSell],
        backgroundColor: [
          "rgba(50,205,50)", // Cor das fatias de bilhetes vendidos
          "rgba(255,99,71)", // Cor das fatias de bilhetes não vendidos
        ],
      },
    ],
  };

  var options = {
    responsive: true,
  };

  var ctx = document.getElementById("Chart3").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: options,
  });
}
