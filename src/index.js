/*** EasyEncryptionのロジック ***/
window.onload = function() {
    // ファイル選択フォーム
    let input_form = document.getElementById("w-c-h-file-input-form");
    // ファイルのパス
    let txt_file = document.getElementById("w-c-h-text-file");
    // シフト数
    let txt_shift = document.getElementById("w-c-h-text-shift");
    // ループ数
    let txt_loop = document.getElementById("w-c-h-text-loop");
    // 結果出力
    let txt_result = document.getElementById("w-c-b-textarea");
    // ダイアログボタン
    let btn_dialog = document.getElementById("w-c-h-label");
    // 実行ボタン
    let btn_run = document.getElementById("w-c-h-bf-label");
    // エンコードボタン
    let rad_encode = document.getElementById("w-c-h-rad-encode")
    //  デコードボタン;
    let rad_decode = document.getElementById("w-c-h-rad-decode");
    // アップロードファイル
    let uploadFile;

    // Event : ファイル読み込み
    let reader = new FileReader();
    reader.addEventListener("load", function() {
        txt_result.value = reader.result;
    });

    // Event : ファイル選択ボタン
    btn_dialog.addEventListener("change",  function(event) {
        uploadFile = event.target.files;
        txt_file.value = uploadFile[0].name;

        reader.readAsText( uploadFile[0]);
    });

    // Event : drag
    input_form.addEventListener("dragover", function(event) {
        finishBabbling(event);
        event.dataTransfer.dropEffect="copy";
    }, false);
    // Event : drop
    input_form.addEventListener("drop", function(event) {
        finishBabbling(event);
        uploadFile = event.target.files;
        txt_file.value = uploadFile[0].name;

        reader.readAsText( uploadFile[0]);
    }, false);

    // Event : 処理を実行するボタン
    btn_run.addEventListener("click", function(event) {
        if (validCheck(event)) {
            if (window.confirm("実行しますか")) {
                if (rad_encode.checked)  run(txt_shift.value, txt_loop.value, "ENCODE");
                if (rad_decode.checked)  run(txt_shift.value, txt_loop.value, "DECODE");
            }
            // labelとbuttonのイベントが呼ばれるので一回目でバブリングを中止する
            finishBabbling(event);
        }
    });
}

// ヴァリデーションチェック
var validCheck = function (event) {

    if (isNothing(document.getElementById("w-c-h-text-shift").value)) {
        alert("SHIFTが未選択！");
        finishBabbling(event);
        return false;
    }

    if (isNothing(document.getElementById("w-c-h-text-loop").value)) {
        alert("LOOPが未選択！");
        finishBabbling(event);
        return false;
    }

    return true;
}

// 実行
var run = function(shift, loop, mode) {
    let val = document.getElementById("w-c-b-textarea").value;
    let result;
    if (mode === "ENCODE") result = caesarEncoding(val, shift, loop);
    if (mode === "DECODE") result = caesarDecoding(val, shift, loop);

    document.getElementById("w-c-b-textarea").value = result;
}
