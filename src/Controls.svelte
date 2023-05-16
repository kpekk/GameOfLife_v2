<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let gameSpeed = 1;

  const startGame = () => {
    dispatch("startGame");
  };

  const stopGame = () => {
    dispatch("stopGame");
  };

  const resetBoard = () => {
    dispatch("resetBoard");
  };

  $: sliderLabel = `Game speed: <span style="color: var(--primary);">${gameSpeed}</span>
      ${gameSpeed === 1 ? "move" : "moves"} per second`;
</script>

<div class="controls-container">
  <div class="buttons">
    <button on:click={startGame}>Start</button>
    <button on:click={stopGame}>Stop</button>
    <button on:click={resetBoard}>Reset</button>
  </div>
  <div class="slider-container">
    <p class="slider-label">
      {@html sliderLabel}
    </p>
    <input type="range" min="1" max="10" bind:value={gameSpeed} />
  </div>
</div>

<style>
  .controls-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
  }

  .slider-container {
    align-items: center;
    background-color: var(--dark-purple);
    border-radius: 2rem;

    width: 40rem;
    margin-top: 1rem;
    padding: 1rem;
  }

  .slider-label {
    color: var(--secondary);
    font-size: 2.5rem;
  }
</style>
