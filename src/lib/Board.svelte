<script lang="ts">
    import Hexagon from "./Hexagon.svelte";
    import { Hex } from "./hexLib";

    const maxDistance = 5;
    const hexSize = 20;

    var hexArray: Hex[] = [];

    // Creates a grid of hexagons with at most maxDistance from the origin
    for(let q = maxDistance; q >=(maxDistance*-1); q--) {
        for(let r = maxDistance; r >= (maxDistance*-1); r--) {
            let s = (q*-1) + (r*-1);
            if((Math.abs(q) + Math.abs(r) + Math.abs(s)) <= 2*maxDistance) {
                hexArray.push(new Hex(q,r,s));
            }
        }
    }
    hexArray.push(new Hex(0,0,0));
</script>

<svg overflow="visible" viewBox="-100 -100 200 200" width=200 height=200>
    {#each hexArray as {q,r,s}}
        <Hexagon q={q} r={r} s={s} size={hexSize}></Hexagon>
    {/each}
</svg>
