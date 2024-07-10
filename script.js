const boxes = document.querySelectorAll(".box");
const msg_content = document.querySelector(".msg-content");
const reset_btn = document.querySelector(".resetgame-btn");
const draw_msg = document.querySelector(".draw-msg");
const blue_text = document.querySelector(".blue-text");
const green_text = document.querySelector(".green-text");
let TurnO = true;

let drawCount = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];

// Set the initial active state
function setInitialActiveState() {
  green_text.classList.add("active");
  blue_text.classList.remove("active");
}

function toggleActiveState() {
  if (TurnO) {
    green_text.classList.add("active");
    blue_text.classList.remove("active");
  } else {
    green_text.classList.remove("active");
    blue_text.classList.add("active");
  }
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.querySelector("img")) return; // prevent multiple clicks
    TurnO = !TurnO;
    toggleActiveState();

    const img = document.createElement("img");
    if (!TurnO) {  // This is now after toggling, so it should be TurnO's turn
      img.src = "Image/X.png";
      box.style.backgroundColor = "rgb(183, 238, 235)";
    } else {
      img.src = "Image/O.png";
      box.style.backgroundColor = "rgb(190, 246, 190)";
    }
    box.appendChild(img);

    drawCount++;
    box.classList.add("disabled");
    winGame();
  });
});

reset_btn.addEventListener("click", () => {
  TurnO = true;
  drawCount = 0;
  enableFun();
  setInitialActiveState();
});

const winGame = () => {
  for (let pattern of winPatterns) {
    const patternval1 = boxes[pattern[0]].querySelector("img");
    const patternval2 = boxes[pattern[1]].querySelector("img");
    const patternval3 = boxes[pattern[2]].querySelector("img");

    if (patternval1 && patternval2 && patternval3) {
      const boxsrcf = patternval1.src;
      const boxsrcs = patternval2.src;
      const boxsrct = patternval3.src;

      if (boxsrcf === boxsrcs && boxsrcs === boxsrct) {
        winmsg(boxsrcf);
        disableFun();
        return;
      }
    }
  }
  if (drawCount === 9) {
    drawMsg();
    setInitialActiveState()
  }
};

const drawMsg = () => {
  draw_msg.innerHTML = "It's a draw!";
};

const disableFun = () => {
  boxes.forEach((box) => {
    box.classList.add("disabled");
  });
};

const enableFun = () => {
  boxes.forEach((box) => {
    box.classList.remove("disabled");
    box.innerHTML = "";
    box.style = "";
  });
  msg_content.innerHTML = "";
  draw_msg.innerHTML = "";
};

const winmsg = (winnerSrc) => {
  const winnerImg = document.createElement("img");
  winnerImg.classList.add("styleimg");
  winnerImg.src = winnerSrc;
  msg_content.appendChild(winnerImg);
  msg_content.innerHTML += ` Congratulation! Winner is `;
};

// Initial UI state
setInitialActiveState();
