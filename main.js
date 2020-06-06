var tab = 1;
function criarForm(variaveis, restricoes) {
  if (variaveis > 0 && restricoes > 0) {
    var vari = "";
    var rest = "";
    var mais = "+";
    for (var i = 1; i <= variaveis; i++) {
      if (i == variaveis) mais = " ";
      vari +=
        '<div class="col-2"><input class="form-control" step="0.01" type="number" value="" id="y' +
        i +
        '"> </div> <label for="example-number-input" class="col-form-label">x' +
        i +
        mais +
        "</label>";
    }
    for (var j = 1; j <= parseInt(restricoes) + 1; j++) {
      rest += "<h6>Restrição " + j + '</h6> <div class="form-group row"> ';
      mais = "+";
      if (parseInt(restricoes) + 1 == j) {
        rest +=
          '<div class="col-2"><label for="example-number-input" class="col-form-label">';
        for (var i = 1; i <= variaveis; i++) {
          if (i == variaveis) rest += "x" + i;
          else rest += "x" + i + ",";
        }
        rest += ">=0</label></div>";
      } else {
        for (var i = 1; i <= variaveis; i++) {
          if (i == variaveis) mais = " ";
          rest +=
            '<div class="col-2"> <input class="form-control" type="number" step="0.01" value="" id="x' +
            j +
            i +
            '"> </div> <label for="example-number-input" class="col-form-label">x' +
            i +
            mais +
            "</label> ";
        }
        rest +=
          ' <select class="input" name="cars" id="d' +
          j +
          '"> <option value="<="> <= </option> <option value=">="> >= </option> <option value="="> =</option> </select> <div class="col-2"> <input class="form-control" type="number" value="" id="b' +
          j +
          '"></div></div> ';
      }
    }
    var text =
      '<div class="card bg-light text-dark"><div class="card-body"><h4 class="card-title">Insira os valores necessários:</h4> <form> <div class="form-group"> <div class="form-group"> <h6>Qual é o objetivo da função?</h6> <div class="col-100"> <select class="input-group" name="cars" id="objetivo"> <option value="max">Maximizar</option> <option value="min">Minimizar</option> </select> <br> </div> <div class="form"> <h6>Função objetivo:</h6> <div class="form-group row"> <label for="example-number-input" class="col-form-label col-auto">Z=</label> ' +
      vari +
      ' </div> </div> <br> <div class="form-group "> ' +
      rest +
      '</div> <button type="button" onClick="matriz()" class="btn btn-primary">Continuar </button>  <button type="button" onClick="criarForm(variaveis.value,regras.value)" class="btn btn-primary">Solução direta</button> <button type="button" onClick="novo()" class="btn btn-secondary"> Novo </button> <img class="img-responsive" src="img/help.png" width="30" onClick="help()" height="30" type="button"/></div> </div> </form> </div></div>';

    document.getElementById("formulario").innerHTML = text;
    document.getElementById("in1").disabled = true;
    document.getElementById("in2").disabled = true;
    document.getElementById("btn1").style.display = "none";
    document.getElementById("img1").style.display = "none";
  } else {
    alert("Digite os dados corretamente!!!");
  }
}

function help() {
  var texto =
    "Simplex - Passo a Passo\n\n" +
    "Informe o número de variáveis (mínimo 1)\n" +
    "Informe o número de restrições (mínimo 1)\n" +
    "obs.: NÃO contar com a restrição Xi >= 0\n" +
    'Clique no botão "OK"\n' +
    "- Vai aparecer na tela o local para informar os valores dos coeficientes.\n" +
    "Informe os valores dos coeficientes das variáveis na função objetivo\n" +
    "Informe os valores dos coeficientes e da constante nas restrições\n" +
    'Clique no botão "Resolver"\n' +
    "- Vai aparecer na tela o passo a passo da resolução informando a operação realizada antes da tabela.\n" +
    "- No final é exibido os valores das variáveis e o valor resultante da função objetivo.\n" +
    'Clique no botão "Novo" para resolver outro problema.\n\n' +
    "observações: O sistema só resolve problemas de maximização,\n" +
    'com restrições de sinal "<=" e com constantes maiores que zero.';
  alert(texto);
}

function novo() {
  window.location.href = "index.html";
}

function esconder(p_variaveis, p_restricoes) {
  for (var i = 1; i <= variaveis; i++) {
    document.getElementById("y" + i).style = "-moz-appearance:textfield;";
    document.getElementById("y" + i).style.border = "0";
    document.getElementById("y" + i).readOnly = true;
    for (var j = 1; j <= restricoes; j++) {
      document.getElementById("x" + j + i).style = "-moz-appearance:textfield;";
      document.getElementById("x" + j + i).style.border = "0";
      document.getElementById("x" + j + i).readOnly = true;
    }
  }
  for (var j = 1; j <= restricoes; j++) {
    document.getElementById("b" + j).style = "-moz-appearance:textfield;";
    document.getElementById("b" + j).style.border = "0";
    document.getElementById("b" + j).readOnly = true;
  }
}

function validarCoeficientes(p_variaveis, p_restricoes) {
  for (var i = 1; i <= p_variaveis; i++) {
    if (document.getElementById("y" + i).value == "") {
      document.getElementById("y" + i).focus();
      alert("Informe os valores de todos os coeficientes.");
      return 1;
    }
    for (var j = 1; j <= p_restricoes; j++) {
      if (document.getElementById("x" + j + i).value == "") {
        document.getElementById("x" + j + i).focus();
        alert("Informe os valores de todos os coeficientes.");
        return 1;
      }
    }
  }
  for (var j = 1; j <= p_restricoes; j++) {
    if (document.getElementById("b" + j).value == "") {
      document.getElementById("b" + j).focus();
      alert("Informe os valores de todas as constantes.");
      return 1;
    }
  }
}
function matriz() {
  var restricoes = parseInt(document.form1.regras.value);
  var variaveis = parseInt(document.form1.variaveis.value);
  if (validarCoeficientes(variaveis, restricoes)) {
  } else {
    if (document.getElementById("objetivo").value == "max") {
      matrizMax();
    } else {
      matrizMin();
    }
  }
}
function tabela(matriz, folga) {
  var restricoes = parseInt(document.form1.regras.value);
  var variaveis = parseInt(document.form1.variaveis.value);
  var total = folga + variaveis;
  var top = "";
  var ola = parseInt(tab) + 1;

  for (var i = 0; i <= total + 1; i++) {
    top += '<th scope="col">' + matriz[0][i] + "</th>";
  }

  var body = "";

  for (var j = 1; j <= restricoes + 1; j++) {
    body += '<tr> <th scope="row">' + matriz[j][0] + "</th>";
    for (var i = 1; i <= total + 1; i++) {
      body += " <td>" + matriz[j][i] + "</td>";
    }
    body += "</tr>";
  }

  var text =
    ' <div class="card bg-light text-dark"> <div class="card-body"> <h4 class="card-title">Tabela:</h4> <form> <div class="form-group"> <table class="table table-striped"><thead> <tr>' +
    top +
    "</tr> </thead><tbody>" +
    body +
    '</tbody></table> <button type="button" onClick="" class="btn btn-primary"> Continuar </button> <button type="button" onClick="novo()" class="btn btn-secondary"> Novo </button> <img class="img-responsive" src="img/help.png" width="30" onClick="help()" height="30" type="button"/> </div> </div> </form> </div></div><h1> </h1><div id="tabela' +
    ola +
    '"></div> ';
  document.getElementById("tabela" + tab).innerHTML = text;
  tab++;
}

function tabelaSai(matriz, folga, x, y) {
  var restricoes = parseInt(document.form1.regras.value);
  var variaveis = parseInt(document.form1.variaveis.value);
  var total = folga + variaveis;
  var top = "";
  var ola = parseInt(tab) + 1;

  for (var i = 0; i <= total + 1; i++) {
    top += '<th scope="col">' + matriz[0][i] + "</th>";
  }

  var body = "";

  for (var j = 1; j <= restricoes + 1; j++) {
    body += '<tr> <th scope="row ">' + matriz[j][0] + "</th>";
    for (var i = 1; i <= total + 1; i++) {
      if (x == j || y == i)
        body += ' <td class="bg-info">' + matriz[j][i] + "</td>";
      else body += " <td>" + matriz[j][i] + "</td>";
    }
    body += "</tr>";
  }

  var text =
    ' <div class="card bg-light text-dark"> <div class="card-body"> <h4 class="card-title">Tabela:</h4> <form> <div class="form-group"> <table class="table table-striped"><thead> <tr>' +
    top +
    "</tr> </thead><tbody>" +
    body +
    '</tbody></table> <button type="button" onClick="" class="btn btn-primary"> Continuar </button> <button type="button" onClick="novo()" class="btn btn-secondary"> Novo </button> <img class="img-responsive" src="img/help.png" width="30" onClick="help()" height="30" type="button"/> </div> </div> </form> </div></div><h1> </h1><div id="tabela' +
    ola +
    '"></div> ';
  document.getElementById("tabela" + tab).innerHTML = text;
  tab++;
}
