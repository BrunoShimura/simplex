function matrizMin() {
  var restricoes = parseInt(document.form1.regras.value);
  var variaveis = parseInt(document.form1.variaveis.value);
  var folga = 0;
  for (var m = 1; m <= restricoes; m++) {
    if (document.getElementById("d" + m).value == ">=") folga += 2;
    else folga += 1;
  }
  var total = folga + variaveis;
  var matriz = new Array();
  matriz[0] = ["Base"];
  var indice = 1;
  for (var l = 1; l <= variaveis; l++) {
    matriz[0][indice] = "x" + indice;
    indice++;
  }
  for (var m = 1; m <= folga; m++) {
    matriz[0][indice] = "f" + m;
    indice++;
  }
  matriz[0][matriz[0].length] = "b";
  for (var i = 1; i <= restricoes; i++) {
    matriz[i] = ["f" + i];
    if (i == restricoes) matriz[i + 1] = ["Lucro"];
  }
  for (i = 1; i <= variaveis; i++) {
    matriz[parseInt(restricoes) + 1][i] =
      1 * parseFloat(document.getElementById("y" + i).value.replace(",", "."));
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
  if (folga == restricoes) {
    for (i = 1; i <= parseInt(restricoes) + 1; i++) {
      for (j = 1; j <= total + 1; j++) {
        if (matriz[i][0] == matriz[0][j]) matriz[i][j] = 1;
        if (matriz[i][j] == null) matriz[i][j] = 0;
      }
    }
  } else {
    var a = 1;
    for (i = 1; i <= parseInt(restricoes) + 1; i++) {
      for (j = 1; j <= total + 1; j++) {
        if (matriz[i][0] == matriz[0][j]) matriz[i][j] = 1;
        if (matriz[i][0] == matriz[0][j]) {
          if (document.getElementById("d" + i).value == ">=") {
            matriz[i][j] = -1;
            matriz[i][variaveis + variaveis + a] = 1;
            matriz[parseInt(restricoes) + 1][j] = 1;
            a++;
          }
        }
        if (matriz[i][j] == null) matriz[i][j] = 0;
      }
    }
  }
  tabela(matriz, folga);
}
