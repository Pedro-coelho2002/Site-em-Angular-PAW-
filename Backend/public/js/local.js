function verificaCodigoPostal() {
  var codePostalTmp = document.getElementById("postcode");
  const regex = /^\d{4}-\d{3}$/;
  const isValid = regex.test(codePostalTmp.value);
  if (isValid) {
    codePostalTmp.setCustomValidity(""); // o valor é válido, não há mensagem de erro
  } else {
    codePostalTmp.setCustomValidity(
      "O código postal deve estar no formato XXXX-XXX"
    ); // o valor é inválido, exibe mensagem de erro
  }
}
