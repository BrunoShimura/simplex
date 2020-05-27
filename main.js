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
function criarForm(variaveis, restricoes) {
  if (variaveis != 0 && restricoes != 0) {
    //console.log(matriz[1][1]);
    var txt = "";
    var funcao =
      '<label for="example-number-input" class="col-1 col-form-label">Z=</label>';
    var mais = "+";
    for (var i = 1; i <= variaveis; i++) {
      if (i == variaveis) mais = "";
      funcao +=
        '<div class="col-2"><input class="form-control" name="var' +
        i +
        '" type="number" value="" id="example-number-input"></div><label for="example-number-input" class="col-form-label">x' +
        i +
        mais +
        "</label>";
    }
    txt +=
      '<h1></h1><div class="card bg-light text-dark"> <div class="card-body"> <h4 class="card-title">Informe os dados iniciais:</h4> <form action="/action_page.php"> <div class="form-group"> <div class="form-group "> <h6>Função objetivo:</h6> <div class="form-group row"> ' +
      funcao +
      ' </div> <div class="form-group "> <h6>Restrições:</h6> <div class="form-group row"> <div     class="col-2"> <input class="form-control" type="number" value="" id="example-number-input"> </div> <label for="example-number-input" class="col-form-label">x1 +</label> <div class="col-2"> <input class="form-control" type="number" value="" id="example-number-input"> </div> <label for="example-number-input" class=" col-form-label">x2 +</label> <div class="col-2"> <input class="form-control" type="number" value="" id="example-number-input"> </div> <label for="example-number-input" class=" col-form-label">x3 <= </label> <div class="col-2"> <input class="form-control" type="number" value="" id="example-number-input"> </div> </div> </div> <button type="submit" class="btn btn-primary">Continuar</button>  </form> </div> </div> </div> ';
    document.getElementById("form1").innerHTML = txt;
  } else {
    alert("Digite os dados corretamente!!!");
  }
}
