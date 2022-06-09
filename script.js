class App {
  buttons = document.querySelectorAll(".btnCont");
  container = document.querySelector(".container");
  btnStart = document.querySelector(".start");
  curSymbol = "x";
  board = new Array(9).fill("");
  winner = undefined;
  stopGame = false;
  constructor() {
    this.btnStart.addEventListener("click", this.init.bind(this));
  }
  init() {
    this.container.addEventListener("click", (e) => {
      console.log(this.stopGame);

      if (this.stopGame) return;
      const btn = e.target;
      if (!btn) return;
      this.writeMove(btn);
      this.sprawdzenie();
      this.isWin();
      this.changeSymbol();
    });
  }
  sprawdzenie() {
    for (let i = 0; i < 3; i++) {
      //sprawdzenie kolumnm i rzędów
      if (
        this.znak(
          this.board[i * 3],
          this.board[i * 3 + 1],
          this.board[i * 3 + 2]
        ) ||
        this.znak(this.board[i], this.board[i + 3], this.board[i + 6])
      )
        this.winner = this.curSymbol;
    }
    //sprawdzenie skosów
    if (
      this.znak(this.board[0], this.board[4], this.board[8]) ||
      this.znak(this.board[2], this.board[4], this.board[6])
    )
      this.winner = this.curSymbol;
  }
  znak(a, b, c) {
    return !!a && a === b && b === c && a === c;
  }

  changeSymbol() {
    this.curSymbol === "x" ? (this.curSymbol = "o") : (this.curSymbol = "x");
  }
  writeMove(btn) {
    const id = btn.dataset.num;
    if (btn.innerHTML === "") btn.innerHTML = this.curSymbol;
    this.board[id - 1] = this.curSymbol;
  }
  isWin() {
    if (this.winner) {
      alert(`Wygrywa ${this.winner}`);
      this.stopGame = true;
    }
  }
}
const app = new App();
