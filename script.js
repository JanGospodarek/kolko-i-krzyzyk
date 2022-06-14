class App {
  buttons = document.querySelectorAll(".btnCont");
  container = document.querySelector(".container");
  btnStart = document.querySelector(".start");
  btnReset = document.querySelector(".reset");
  curSymbol = "x";
  board = new Array(9).fill("");
  winner = undefined;
  btn = undefined;
  stopGame = false;
  move = 0;
  constructor() {
    this.btnStart.addEventListener("click", this.init.bind(this));
    this.btnReset.addEventListener("click", this.reset.bind(this));
  }

  init() {
    this.unblur();
    this.container.addEventListener("click", (e) => {
      this.btn = e.target.closest(".btnCont");
      if (!this.btn || this.stopGame) return;
      if (this.btn.innerHTML === "") {
        this.writeMove();
        this.check();
        this.isWin();
        this.isDraw();
        this.changeSymbol();
      }
    });
  }

  unblur() {
    this.container.classList.remove("filter");
  }

  isDraw() {
    this.move += 1;
    if (this.move === 9 && this.stopGame === false && !this.winner) {
      this.stopGame = true;
      alert("Remis!");
    }
  }

  check() {
    for (let i = 0; i < 3; i++) {
      //check column and rows
      if (
        this.char(
          this.board[i * 3],
          this.board[i * 3 + 1],
          this.board[i * 3 + 2]
        ) ||
        this.char(this.board[i], this.board[i + 3], this.board[i + 6])
      )
        this.winner = this.curSymbol;
    }
    //check skosów
    if (
      this.char(this.board[0], this.board[4], this.board[8]) ||
      this.char(this.board[2], this.board[4], this.board[6])
    )
      this.winner = this.curSymbol;
  }

  char(a, b, c) {
    return !!a && a === b && b === c && a === c;
  }

  changeSymbol() {
    this.curSymbol === "x" ? (this.curSymbol = "o") : (this.curSymbol = "x");
  }

  writeMove() {
    const id = this.btn.dataset.num;
    this.btn.innerHTML = this.curSymbol;
    this.board[id - 1] = this.curSymbol;
  }

  isWin() {
    if (this.winner) {
      alert(`Wygrywa ${this.winner}`);
      this.stopGame = true;
    }
  }

  reset() {
    window.location.reload();
  }
}
const app = new App();
