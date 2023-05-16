<script>
  import Board from "./Board.svelte";
  import Controls from "./Controls.svelte";

  let interval;
  let gameSpeed;

  let board;

  const startGame = () => {
    stopGame();

    interval = setInterval(() => {
      board.nextState();
    }, 1000 / gameSpeed);
  };

  const stopGame = () => {
    clearInterval(interval);
  };

  const resetBoard = () => {
    stopGame();
    board.resetBoard();
  };
</script>

<div class="game-container">
  <Board bind:this={board} />
  <Controls
    on:startGame={startGame}
    on:stopGame={stopGame}
    on:resetBoard={resetBoard}
    bind:gameSpeed
  />
</div>

<style>
  .game-container {
    height: 85%;
  }
</style>
