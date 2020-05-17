const botao = document.querySelector("a");

botao.addEventListener("click", (event) => {
  const variavel = document.forms["form"]["variavel"].value;
  const valores = document.forms["form"]["valores"].value;

  if ((variavel == "") || (valores == "")) {
    alert("Insira os valores corretamente")
  } else {
    var val = JSON.parse("[" + valores + "]");
    document.getElementById("tb").innerHTML = criaTabela(variavel, val);
  }
})
//------------------------------------------------------------------------------
