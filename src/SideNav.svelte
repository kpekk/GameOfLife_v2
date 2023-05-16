<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let menuVisible = false;

  const toggleSideNav = () => {
    menuVisible = !menuVisible;
  };

  const addShape = (event) => {
    dispatch("addShape", event.target.id);
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="sidenav-button" on:click={toggleSideNav}>=</div>
{#if menuVisible}
  <div class="sidenav-menu">
    <p class="sidenav-heading">Shapes</p>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div>
      <h2>Still lifes</h2>
      <div class="menu-item" on:click={addShape} id="block">Block</div>
      <div class="menu-item" on:click={addShape} id="beehive">Beehive</div>
      <div class="menu-item" on:click={addShape} id="loaf">Loaf</div>
      <div class="menu-item" on:click={addShape} id="boat">Boat</div>
      <div class="menu-item" on:click={addShape} id="tub">Tub</div>
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div>
      <h2>Oscillators</h2>
      <div class="menu-item" on:click={addShape} id="blinker">Blinker</div>
      <div class="menu-item" on:click={addShape} id="beacon">Beacon</div>
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div>
      <h2>Spaceships</h2>
      <div class="menu-item" on:click={addShape} id="glider">Glider</div>
      <div class="menu-item" on:click={addShape} id="lwss">LWSS</div>
    </div>
  </div>
{/if}

<style>
  .sidenav-button {
    position: absolute;
    top: 4.5%;
    right: 3rem;
    z-index: 2;
    cursor: pointer;

    height: 5vh;
    width: 5vh;

    color: var(--primary);
    font-size: 4rem;

    border: 0.1rem solid var(--primary);
    border-radius: 1rem;
    padding: 1rem;
  }

  .sidenav-menu {
    position: absolute;
    top: 0;
    right: 0;

    height: 100%;
    width: 40rem;
    background-color: var(--bg);
    border-left: 0.1rem solid var(--primary);
  }

  .sidenav-menu > * {
    color: var(--primary);
    font-size: 2rem;
  }

  .sidenav-heading {
    font-size: 5rem;
  }

  .menu-item {
    cursor: pointer;
  }

  .menu-item:hover {
    box-shadow: 1rem 0 2rem 0.2rem var(--secondary);
  }
</style>
