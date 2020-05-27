//==============================================================================
// cria manual
//==============================================================================
function manual() {
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
//==============================================================================
// cria fomulário
//==============================================================================
function criarForm(variaveis, restricoes) {
  if (variaveis != 0 && restricoes != 0) {
    var txt = "";
    var funcao =
      '<label for="example-number-input" class="col-1 col-form-label">Z=</label>';
    var restricao = "";
    var mais = "+";
    for (var i = 1; i <= variaveis; i++) {
      if (i == variaveis) mais = "";
      funcao +=
        '<div class="col-2"><input class="form-control" id="y' +
        i +
        '" name="y' +
        i +
        '" type="number" value="" id="example-number-input"></div><label for="example-number-input" class="col-form-label">x' +
        i +
        mais +
        "</label>";
    }
    for (var i = 1; i <= restricoes; i++) {
      restricao += "<h6>Restrição " + i + ':</h6><div class="form-group row">';
      mais = "";
      for (var j = 1; j <= variaveis; j++) {
        if (j == variaveis) mais = "  <=";
        restricao +=
          '<div class="col-2"> <input class="form-control" id="x' +
          i +
          j +
          '" name="x' +
          i +
          j +
          '" type="number" value="" id="example-number-input"> </div> <label for="example-number-input" class="col-form-label">x' +
          j +
          mais +
          "</label>";
      }
      restricao +=
        '<div class="col-2"><input class="form-control" id="b' +
        i +
        '" name="b' +
        i +
        '" type="number" value="" id="example-number-input"></div></div>';
    }
    txt +=
      '<h1></h1><div class="card bg-light text-dark"> <div class="card-body"> <h4 class="card-title">Informe os dados iniciais:</h4> <form action="" method="post" name="form2" id="form2"> <div class="form-group"> <div class="form-group "> <h6>Função objetivo:</h6> <div class="form-group row"> ' +
      funcao +
      " </div>" +
      restricao +
      '<button type="button" onClick="criarMatriz(variaveis.value,regras.value)" class="btn btn-primary">Continuar</button> <button onClick="atualizar()" type="reset" class="btn btn-secondary">Novo</button> <img onClick="manual()" type="submit" id="help" class="img-responsive" src="img/help.png" width="30" height="30"/>  </form> </div> </div> </div> ';
    document.getElementById("form1").innerHTML = txt;
    document.getElementById("btn1").style.display = "none";
    document.getElementById("help").style.display = "none";
    document.getElementById("in1").disabled = true;
    document.getElementById("in2").disabled = true;
  } else {
    alert("Digite os dados corretamente!!!");
  }
}
//==============================================================================
// cria tabela
//==============================================================================
function criarTable(variaveis, restricoes, matriz) {
  if (validaMatriz(variaveis, restricoes)) {
  } else {
    var titulo = "";
    var txt = "";
    var corpo = "";
    var total = parseInt(variaveis) + parseInt(restricoes);
    for (var i = 0; i <= total; i++) {
      titulo += '<th scope="col">' + matriz[0][i] + "</th>";
    }
    for (var i = 1; i <= restricoes; i++) {
      
      corpo += '<tr><th scope="row">' + matriz[i][0] + "</th>";
      for (var j = 1; j <= total; j++) {
        corpo += "<td>" + matriz[i][j] + "</td>";
      }
      corpo += "</tr>";
    }
    txt =
      '<h1></h1> <div class="card bg-light text-dark"> <div class="card-body"> <h4 class="card-title">Solução básica:</h4> <form action="/action_page.php"> <div class="form-group"> <table class="table table-striped"> <thead> <tr> ' +
      titulo +
      "  </tr> </thead> <tbody> " +
      corpo +
      '</tbody> </table> </div> <button type="submit" class="btn btn-primary">Continuar</button> </form> </div> </div> </div>';
    document.getElementById("table1").innerHTML = txt;
  }
}
//==============================================================================
// cria tabela
//==============================================================================
function atualizar() {
  window.location.href = "index.html";
}
//==============================================================================
// valida valores
//==============================================================================

function validaMatriz(variaveis, restricoes) {
  for (i = 1; i <= variaveis; i++) {
    if (document.getElementById("y" + i).value == "") {
      document.getElementById("y" + i).focus();
      alert("Informe os valores de todos os coeficientes.");
      return 1;
    }
    for (j = 1; j <= restricoes; j++) {
      if (document.getElementById("x" + j + i).value == "") {
        document.getElementById("x" + j + i).focus();
        alert("Informe os valores de todos os coeficientes.");
        return 1;
      }
    }
  }
  for (j = 1; j <= variaveis; j++) {
    if (document.getElementById("b" + j).value == "") {
      document.getElementById("b" + j).focus();
      alert("Informe os valores de todas as constantes.");
      return 1;
    }
  }
}
//==============================================================================
// cria matriz
//==============================================================================

function criarMatriz(variaveis, restricoes) {
  //indices da matriz
  var matriz = [[]];
  matriz[0][] = "Base";
  //============================================================================
  criarTable(variaveis, restricoes, matriz);
}
