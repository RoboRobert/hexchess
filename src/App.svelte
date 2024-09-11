<script lang="ts">
  // Imports for white piece icons
  import whiteKing from './assets/pieces/Chess_klt45.svg'
  import whiteQueen from './assets/pieces/Chess_qlt45.svg'
  import whiteRook from './assets/pieces/Chess_rlt45.svg'
  import whiteBishop from './assets/pieces/Chess_blt45.svg'
  import whiteKnight from './assets/pieces/Chess_nlt45.svg'
  import whitePawn from './assets/pieces/Chess_plt45.svg'

  // Imports for black piece icons
  import blackKing from './assets/pieces/Chess_kdt45.svg'
  import blackQueen from './assets/pieces/Chess_qdt45.svg'
  import blackRook from './assets/pieces/Chess_rdt45.svg'
  import blackBishop from './assets/pieces/Chess_bdt45.svg'
  import blackKnight from './assets/pieces/Chess_ndt45.svg'
  import blackPawn from './assets/pieces/Chess_pdt45.svg'

  import { Theme } from './board/ColorPicker'
  import Board from './board/Board.svelte'

</script>

<main>
  <div class="headerDiv">
    <h1>Hexagonal Chess</h1>
  </div>

  <Board radius={5} hexSize={50} theme={Theme.GRAYSCALE}></Board>

  <div>
    <img src={whiteKing} class="piece white" alt="White King" />
    <img src={whiteQueen} class="piece white" alt="White Queen" />
    <img src={whiteRook} class="piece white" alt="White Rook" />
    <img src={whiteBishop} class="piece white" alt="White Bishop" />
    <img src={whiteKnight} class="piece white" alt="White Knight" />
    <img src={whitePawn} class="piece white" alt="White Pawn" />
  </div>

  <div>
    <img src={blackKing} class="piece black" alt="Black King" />
    <img src={blackQueen} class="piece black" alt="Black Queen" />
    <img src={blackRook} class="piece black" alt="Black Rook" />
    <img src={blackBishop} class="piece black" alt="Black Bishop" />
    <img src={blackKnight} class="piece black" alt="Black Knight" />
    <img src={blackPawn} class="piece black" alt="Black Pawn" />
  </div>
  
</main>

<style>
  .piece {
    height: 5em;
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
