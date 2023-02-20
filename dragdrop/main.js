let dragged;

/* ドラッグ可能なターゲット上で発生するイベント */
const source = document.getElementById("draggable");
source.addEventListener("drag", event => {
  console.log("dragging");
});

source.addEventListener("dragstart", event => {
  // ドラッグ中の要素の参照を保存
  dragged = event.target;
  // 半透明にする
  event.target.classList.add("dragging");
});

source.addEventListener("dragend", event => {
  // 透明度を解除
  event.target.classList.remove("dragging");
});

/* ドロップ対象に発生するイベント */
const target = document.getElementById("droptarget");
target.addEventListener("dragover", event => {
  // ドロップできるように既定の動作を停止
  event.preventDefault();
}, false);

target.addEventListener("dragenter", event => {
  // ドラッグ可能な要素がドロップ先に入ったときに、ドロップ先の候補を強調表示する
  if (event.target.classList.contains("dropzone")) {
    event.target.classList.add("dragover");
  }
});

target.addEventListener("dragleave", event => {
  // ドラッグ可能な要素がドロップ先から離れたときに、ドロップ先の候補の背景をリセットする
  if (event.target.classList.contains("dropzone")) {
    event.target.classList.remove("dragover");
  }
});

target.addEventListener("drop", event => {
  // 既定の動作（一部の要素でリンクとして開く）を行わないようにする。
  event.preventDefault();
  // ドラッグした要素を選択されたドロップターゲットに移動する
  if (event.target.classList.contains("dropzone")) {
    event.target.classList.remove("dragover");
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
});
