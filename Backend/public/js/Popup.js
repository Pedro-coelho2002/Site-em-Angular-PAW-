// Função para selecionar apenas uma checkbox de cada vez
function enableSingleSelection() {
  // Obtém todas as checkboxes dentro da tabela
  const checkboxes = document.querySelectorAll(
    '#modalDiscounts table input[type="checkbox"]'
  );

  // Adiciona um evento de clique a cada checkbox
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("click", function () {
      // Verifica se a checkbox foi marcada
      if (this.checked) {
        document.getElementById("discountValue").value = Number(this.value);

        // Desmarca todas as outras checkboxes
        checkboxes.forEach(function (otherCheckbox) {
          if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = false;
          }
        });
      } else {
        // Verifica se nenhuma checkbox está selecionada
        const noCheckboxSelected = [...checkboxes].every(function (checkbox) {
          return !checkbox.checked;
        });

        // Define o valor como 0 se nenhuma checkbox estiver selecionada
        if (noCheckboxSelected) {
          document.getElementById("discountValue").value = "0";
        }
      }
    });
  });
}

function openPopup() {
  var user = findUserByNIF();
 
  if (countTickets() === 0) {
    alert("Existem campos em falta.");
  }

  if (user !== null) {
    var popup = document.getElementById("modalDiscounts");
    popup.style.display = "block";

    // Points of user
    document.getElementById("userPoints").innerHTML = user.points;
    document.getElementById("userPointsInput").value = user.points;

    // Checkbox Discounts
    var discount40 = document.getElementById("checkDiscount40");
    var discount25 = document.getElementById("checkDiscount25");
    var discount10 = document.getElementById("checkDiscount10");

    //verificacao se user tem pontos suficientes para poder comprar
    if (user.points >= 100) {
      discount40.disabled = false;
    } else {
      discount40.disabled = true;
      discount40.checked = false;
    }

    if (user.points >= 60) {
      discount25.disabled = false;
    } else {
      discount25.disabled = true;
      discount25.checked = false;
    }

    if (user.points >= 30) {
      discount10.disabled = false;
    } else {
      discount10.disabled = true;
      discount10.checked = false;
    }
  } else {    
    console.log("nao deu!");
    document.getElementById('formID').submit();
  }
}

function closePopup() {
  document.getElementById("modalDiscounts").style.display = "none";
}

// Evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  enableSingleSelection();
});
