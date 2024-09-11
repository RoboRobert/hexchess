<script lang="ts">
  let count: number = 1;
  function increment() {
    count+=1;
    return null;
  }
</script>

<button on:click={increment} class="button">
  count is {count}
</button>
