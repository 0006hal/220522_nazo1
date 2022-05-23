let cursorSize = 20; //カーソルのサイズ
let stalkerX; //マウスストーカーの座標
let stalkerY;
const stalkerEasing = 0.05; //イージング　0~1
let stalkerSize = 80;
let stalkerArufa = 20;
let stalkerCorner = stalkerSize / 2;
let img01, img02;
let clearFlag = false;

function preload() {
  img01 = loadImage("img/img01.png");
  img02 = loadImage("img/img02.png");
}

function setup() {
  let canvas = createCanvas(1280, 720);
  canvas.parent("canvas"); //#canvasの子要素にする
  colorMode(HSB, 360, 100, 100, 100); //色！
  noCursor(); //デフォカーソル消す
  rectMode(CENTER);

  stalkerX = mouseX;
  stalkerY = mouseY;
}

function draw() {
  background(0, 0, 90);
  image(img01, 0, 0, width, height);

  //「さい」判定
  const answer = document.getElementById("answer");
  if (
    answer.value == "さい" ||
    answer.value == "サイ" ||
    answer.value == "犀"
  ) {
    answer.value = "";
    document.getElementById("label-hint").innerHTML = "こたえはてんさい";
    document.getElementById("input-wrap").classList.add("input-change");
  }

  //↓ストーカー描画
  const dx = mouseX - stalkerX;
  const vx = dx * stalkerEasing;
  stalkerX += vx;

  const dy = mouseY - stalkerY;
  const vy = dy * stalkerEasing;
  stalkerY += vy;

  if (mouseIsPressed) {
    stalkerCorner -= stalkerCorner * stalkerEasing * 4;
    stalkerArufa += (80 - stalkerArufa) * stalkerEasing * 4; //背景もかえるとなんかださい

    //「てんさい」正誤判定
    if (
      mouseX <= width / 4 &&
      mouseX > 0 &&
      mouseY >= height / 2 &&
      mouseY < height
    ) {
      if (
        answer.value == "てんさい" ||
        answer.value == "テンサイ" ||
        answer.value == "天才"
      ) {
        clearFlag = true;
      }
    }
  } else {
    stalkerCorner += (stalkerSize - stalkerCorner) * stalkerEasing;
    stalkerArufa += (20 - stalkerArufa) * stalkerEasing; //背景もかえるとなんかださい
  }

  strokeWeight(1);
  stroke(0, 10, 0, 100);
  fill(0, 0, 100, stalkerArufa);
  rect(stalkerX, stalkerY, stalkerSize, stalkerSize, stalkerCorner);

  //↓カーソル描画
  noStroke();
  fill(0, 100, 100);
  circle(mouseX, mouseY, cursorSize);

  //くりあ！
  if (clearFlag)
    image(img02, width / 2 - img02.width / 2, height / 2 - img02.height / 2);

  //デバッグ
  // stroke(0, 0, 0);
  // line(width / 4, 0, width / 4, height);
  // line(0, height / 2, width, height / 2);
}
