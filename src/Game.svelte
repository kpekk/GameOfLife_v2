<script>
  import Board from "./Board.svelte";
  import Controls from "./Controls.svelte";

  let interval;
  let gameSpeed;

  let board;

  const startGame = () => {
    clearInterval(interval);

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
    on:resetBoard={resetBoard}
    on:stopGame={stopGame}
    on:startGame={startGame}
    bind:gameSpeed
  />
</div>

<style>
  .game-container {
    height: 85%;
  }
</style>
