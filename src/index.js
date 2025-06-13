/***  平文をシーザー暗号に変換する処理***/
var caesarEncoding = function (text, shift, loop) {
  let rows = text.split(/\r\n|\r|\n/);
  let result = "";
  let buff = "";
  for (var row_idx = 0; row_idx < rows.length; row_idx++) {
    let row = encodeURIComponent(rows[row_idx]);

    for (var l_idx = 0; l_idx < loop; l_idx++) {
      for (var chr_idx = 0; chr_idx < row.length; chr_idx++) {
        buff += String.fromCharCode(row.charCodeAt(chr_idx) + parseInt(shift));
      }
      row = buff;
      buff = "";
    }
    result += row + "\n";
  }

  return result;
};

/***  シーザー暗号を平文に変換する処理***/
var caesarDecoding = function (text, shift, loop) {
  let rows = text.split(/\r\n|\r|\n/);
  let result = "";
  let buff = "";
  for (var row_idx = 0; row_idx < rows.length; row_idx++) {
    let row = rows[row_idx];

    for (var l_idx = 0; l_idx < loop; l_idx++) {
      for (var chr_idx = 0; chr_idx < row.length; chr_idx++) {
        buff += String.fromCharCode(row.charCodeAt(chr_idx) - parseInt(shift));
      }
      row = buff;
      buff = "";
    }
    result += decodeURIComponent(row) + "\n";
  }

  return result;
};
