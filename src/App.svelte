<script lang="ts">
  import whiteKing from './assets/Chess_klt45.svg'
  import whiteQueen from './assets/Chess_qlt45.svg'
  import whiteRook from './assets/Chess_rlt45.svg'
  import whiteBishop from './assets/Chess_blt45.svg'
  import whiteKnight from './assets/Chess_nlt45.svg'
  import whitePawn from './assets/Chess_plt45.svg'

  import blackKing from './assets/Chess_kdt45.svg'
  import blackQueen from './assets/Chess_qdt45.svg'
  import blackRook from './assets/Chess_rdt45.svg'
  import blackBishop from './assets/Chess_bdt45.svg'
  import blackKnight from './assets/Chess_ndt45.svg'
  import blackPawn from './assets/Chess_pdt45.svg'
</script>

<main>
  <h1>Hexagonal Chess</h1>

  <div>
    <img src={whiteKing} class="piece white" alt="White king" />
    <img src={whiteQueen} class="piece white" alt="White queen" />
    <img src={whiteRook} class="piece white" alt="White rook" />
    <img src={whiteBishop} class="piece white" alt="White bishop" />
    <img src={whiteKnight} class="piece white" alt="White knight" />
    <img src={whitePawn} class="piece white" alt="White pawn" />
  </div>

  <div>
    <img src={blackKing} class="piece black" alt="Black King" />
    <img src={blackQueen} class="piece black" alt="Black King" />
    <img src={blackRook} class="piece black" alt="Black King" />
    <img src={blackBishop} class="piece black" alt="Black King" />
    <img src={blackKnight} class="piece black" alt="Black King" />
    <img src={blackPawn} class="piece black" alt="Black King" />
  </div>
</main>

<style>
  .piece {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .piece.black:hover {
    filter: drop-shadow(0 0 2em #000000aa);
  }
  .piece.white:hover {
    filter: drop-shadow(0 0 2em #ffffffaa);
  }
</style>
