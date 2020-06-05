function matrizMin() {
  var restricoes = parseInt(document.form1.regras.value);
  var variaveis = parseInt(document.form1.variaveis.value);
  var total = restricoes + variaveis;
  var matriz = new Array();
  matriz[0] = ["Base"];
  var indice = 1;
  for (var l = 1; l <= variaveis; l++) {
    matriz[0][indice] = "x" + indice;
    indice++;
  }
  for (var m = 1; m <= restricoes; m++) {
    matriz[0][indice] = "f" + m;
    indice++;
  }
  matriz[0][matriz[0].length] = "b";
  for (var i = 1; i <= restricoes; i++) {
    matriz[i] = ["f" + i];
    if (i == restricoes) matriz[i + 1] = ["Lucro"];
  }
  for (i = 1; i <= variaveis; i++) {
    matriz[parseInt(restricoes) + 1][i] = parseFloat(
      document.getElementById("y" + i).value.replace(",", ".")
    );
    for (j = 1; j <= restricoes; j++) {
      matriz[j][i] = parseFloat(
        document.getElementById("x" + j + i).value.replace(",", ".")
      );
    }
  }
  for (j = 1; j <= restricoes; j++) {
    matriz[j][total + 1] = parseFloat(
      document.getElementById("b" + j).value.replace(",", ".")
    );
  }

  for (i = 1; i <= parseInt(restricoes) + 1; i++) {
    for (j = 1; j <= total + 1; j++) {
      if (matriz[i][0] == matriz[0][j]) matriz[i][j] = 1;
      if (matriz[i][j] == null) matriz[i][j] = 0;
    }
  }
  tabela(matriz);
}
