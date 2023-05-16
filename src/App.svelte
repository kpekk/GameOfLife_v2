<script>
  import Game from "./Game.svelte";
  import Header from "./Header.svelte";
  import SideNav from "./SideNav.svelte";
</script>

<main>
  <Header />
  <SideNav></SideNav>

  <Game />
</main>

<style>
  main {
    text-align: center;
    margin: 0 auto;
    height: 100%;
    width: 100%;
  }
</style>
