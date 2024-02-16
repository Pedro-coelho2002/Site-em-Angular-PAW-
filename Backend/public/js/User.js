/**
 * Valida o contacto para que seja possível inserir:
 * 9******** ou 2********
 */
function validateContacto() {
  var contacto = document.getElementById("contact");
  const padrao = /^(\+351)?[92]{1}[0-9]{8}$/;
  const isValid = padrao.test(contacto.value);
  if (isValid) {
    contacto.setCustomValidity(""); // The value is valid, no error message
    return true;
  } else {
    contacto.setCustomValidity("O contacto não está no formato correto !!"); // The value is invalid, display error message
    return false;
  }
}

/**
 * Valida o email
 * Exemplo: exemplo@email.com
 */
function validateEmail() {
  var emailTmp = document.getElementById("email");
  const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = padrao.test(emailTmp.value);
  if (isValid) {
    emailTmp.setCustomValidity(""); // The value is valid, no error message
    return true;
  } else {
    emailTmp.setCustomValidity("O email não está no formato correto !!"); // The value is invalid, display error message
    return false;
  }
}

/**
 * Função usada para colocar como selecionada
 * a opção correspondente ao cargo do funcionario.
 *
 * @param {Cargo do empregado} cargoTmp
 */
function selectCargo(cargoTmp) {
  const selectElement = document.querySelector('select[name="cargo"]');
  selectElement.value = cargoTmp;
}

function findUserByNIF() {
  var users = JSON.parse(document.getElementById("users").value);
  var userNif = Number(document.getElementById("nif").value);

  if (userNif !== "") {
    var i = 0;
    while (i < users.length) {
      if (users[i].nif === userNif) {
        
        return users[i];
      }
      i++;
    }

    if (i === users.length) {
      console.log("NAo encontrou!");
      return null;
    }
  } else {
    console.log("NAo encontrou!");
    return null;
  }
}
