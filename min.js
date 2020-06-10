//==============================================================================
// criando matriz de maximização
//==============================================================================
function matrizMin() {
  var restricoes = parseInt(document.form1.regras.value);
  var variaveis = parseInt(document.form1.variaveis.value);
  var folga = 0,
    aux = 0;
  for (var m = 1; m <= restricoes; m++) {
    if (document.getElementById("d" + m).value == ">=") {
      aux += 1;
      folga += 2;
    } else folga += 1;
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
    if (i == restricoes) {
      matriz[i + 1] = ["- Lucro"];
      matriz[i + 2] = ["- Auxiliar"];
    }
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
    for (j = 1; j <= total + 1; j++) {
      matriz[parseInt(restricoes) + 2][j] = 0;
    }
    for (i = 1; i <= parseInt(restricoes); i++) {
      for (j = 1; j <= variaveis + aux; j++) {
        matriz[parseInt(restricoes) + 2][j] += matriz[i][j];
      }
      matriz[parseInt(restricoes) + 2][total + 1] += matriz[i][total + 1];
    }
    for (j = 1; j <= total + 1; j++) {
      matriz[parseInt(restricoes) + 2][j] =
        -1 * matriz[parseInt(restricoes) + 2][j];
    }
  } else {
    var a = 0;
    for (i = 1; i <= parseInt(restricoes) + 1; i++) {
      for (j = 1; j <= total + 1; j++) {
        if (matriz[i][0] == matriz[0][j]) matriz[i][j] = 1;
        if (matriz[i][0] == matriz[0][j]) {
          if (document.getElementById("d" + i).value == ">=") {
            matriz[i][j] = -1;
            matriz[i][variaveis + variaveis + a] = 1;
            a++;
          }
        }
        if (matriz[i][j] == null) matriz[i][j] = 0;
      }
    }
    for (j = 1; j <= total + 1; j++) {
      matriz[parseInt(restricoes) + 2][j] = 0;
    }
    for (i = 1; i <= parseInt(restricoes); i++) {
      for (j = 1; j <= variaveis + aux; j++) {
        matriz[parseInt(restricoes) + 2][j] += matriz[i][j];
      }
      matriz[parseInt(restricoes) + 2][total + 1] += matriz[i][total + 1];
    }
    for (j = 1; j <= total + 1; j++) {
      matriz[parseInt(restricoes) + 2][j] =
        -1 * matriz[parseInt(restricoes) + 2][j];
    }
  }
  interacao2(matriz, folga);
}
//==============================================================================
// interações ate lucro > 0
//==============================================================================
function interacao2(matriz, folga) {
  tabela2(matriz, folga);

  do {
    matriz = calculaMatrizMin(matriz, folga);
  } while (condicaoParadaMin(matriz, folga) == 0);
}
//==============================================================================
// calcula a matriz
//==============================================================================
function calculaMatrizMin(matriz, folga) {
  var restricoes = parseInt(document.form1.regras.value);
  var variaveis = parseInt(document.form1.variaveis.value);
  var total = folga + variaveis;
  var x = 0,
    y = 0,
    menor = 1,
    div = 1,
    maior = 100000000000000;

  for (var j = 1; j <= total; j++) {
    if (matriz[restricoes + 2][j] < menor) {
      //Condição de entrada na base: o menor valor negativo na linha Z
      //(ou o de maior valor absoluto entre os negativos) indica a variável Pj que entra na base.
      menor = matriz[restricoes + 2][j];
      y = j;
    }
  }
  for (var i = 1; i <= restricoes; i++) {
    //Condição de saída da base: depois de obter a variável de entrada,
    //determina-se a variável de saída por meio do menor quociente P0/Pj dos valores estritamente positivos.
    div = parseFloat(matriz[i][total + 1]) / parseFloat(matriz[i][y]);
    if (div < maior && div > 0) {
      maior = div;
      x = i;
    }
  }
  matriz[x][0] = matriz[0][y];
  var newMatriz = new Array();
  newMatriz[0] = ["Base"];
  var indice = 1;
  for (var l = 1; l <= variaveis; l++) {
    newMatriz[0][indice] = "x" + indice;
    indice++;
  }
  for (var m = 1; m <= folga; m++) {
    newMatriz[0][indice] = "f" + m;
    indice++;
  }
  newMatriz[0][newMatriz[0].length] = "b";
  for (var i = 1; i <= restricoes; i++) {
    newMatriz[i] = ["f" + i];
    if (i == restricoes) {
      newMatriz[i + 1] = ["Lucro"];
      newMatriz[i + 2] = ["- Auxiliar"];
    }
  }
  for (var i = 1; i <= restricoes + 2; i++) {
    for (var j = 1; j <= total + 1; j++) {
      newMatriz[i][j] = matriz[i][j];
    }
  }
  newMatriz[x][0] = newMatriz[0][y];
  alertTabelaSai2(newMatriz, folga, x, y);
  for (var j = 1; j <= total + 1; j++) {
    newMatriz[x][j] = parseFloat(matriz[x][j]) / parseFloat(matriz[x][y]);
  }
  for (var i = 1; i <= restricoes + 2; i++) {
    for (var j = 1; j <= total + 1; j++) {
      if (i != x)
        newMatriz[i][j] =
          parseFloat(newMatriz[x][j]) * (-1 * parseFloat(matriz[i][y])) +
          parseFloat(matriz[i][j]);
    }
  }
  tabelaSai2(newMatriz, folga, x, y);

  return newMatriz;
}
//==============================================================================
// condição de parada da interação
//==============================================================================
function condicaoParadaMin(matriz, folga) {
  var restricoes = parseInt(document.form1.regras.value);
  var variaveis = parseInt(document.form1.variaveis.value);
  var total = folga + variaveis;
  for (var i = 1; i <= variaveis; i++) {
    //Critério de parada: quando na linha Z não aparece nenhum valor negativo.
    if (matriz[restricoes + 2][i] < 0) return 0;
  }

  return 1;
}

//==============================================================================
// condição de parada da interação
//==============================================================================

function matrizMin2() {
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
    var a = 0;
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
  interacao(matriz, folga);
}
