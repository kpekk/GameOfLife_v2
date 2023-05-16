<script>
  import Board from "./Board.js";
  import SideNav from "./SideNav.svelte";

  let board = new Board(10, 15);

  export const nextState = () => {
    board.nextState();
    board = board;
  };

  export const resetBoard = () => {
    board.resetBoard();
    board = board;
  };

  const cellClicked = (event) => {
    let i = event.target.id.split("_")[0];
    let j = event.target.id.split("_")[1];

    let classList = event.target.classList;

    if (classList.contains("inhabited")) {
      classList.remove("inhabited");
      board.setCell(i, j, 0);
    } else {
      classList.add("inhabited");
      board.setCell(i, j, 1);
    }
  };
</script>

<SideNav></SideNav>
<div class="field-container">
  <table cellspacing="0">
    {#each board.board as row, i}
      <tr>
        {#each row as elem, j}
          <td
            id="{i}_{j}"
            class:inhabited={elem === 1}
            on:mousedown={cellClicked}
          />
        {/each}
      </tr>
    {/each}
  </table>
</div>

<style>
  .field-container {
    width: 80%;
    border: 0.1rem solid var(--secondary);
    margin: 0 auto;
    height: 65%;
  }

  table {
    height: 100%;
    width: 100%;
  }

  td {
    border: 0.1rem solid var(--darker);
  }

  .inhabited {
    background-color: var(--primary);
  }
</style>
