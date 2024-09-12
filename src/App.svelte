<script lang="ts">
  import { Theme } from './board/ColorPicker'
  import Board from './board/Board.svelte'

</script>

<main>
  <div class="headerDiv">
    <h1>Hexagonal Chess</h1>
  </div>

  <Board radius={5} hexSize={50} theme={Theme.GRAYSCALE}></Board>
</main>

<style>
</style>
