import { For, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import ChessPiece from '~/components/ChessPiece';

// Green -> Yellow -> Blue -> Red ------ Repeat
const [turn, setTurn] = createSignal('green');
const [instructions, setInstructions] = createSignal('');
const moves = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
// const [moves, setMoves] = createStore([]);

const totalMoves = 57;

const [greenPieces, setGreenPieces] = createStore([
  { n: 1, pos: 0 },
  { n: 2, pos: 0 },
  { n: 3, pos: 0 },
  { n: 4, pos: 0 },
]);

const [yellowPieces, setYellowPieces] = createStore([
  { n: 1, pos: 0 },
  { n: 2, pos: 0 },
  { n: 3, pos: 0 },
  { n: 4, pos: 0 },
]);

const [bluePieces, setBluePieces] = createStore([
  { n: 1, pos: 0 },
  { n: 2, pos: 0 },
  { n: 3, pos: 0 },
  { n: 4, pos: 0 },
]);

const redPieces = createStore([
  { n: 1, pos: 0 },
  { n: 2, pos: 0 },
  { n: 3, pos: 0 },
  { n: 4, pos: 0 },
]);

const Dice = () => {
  const dice = [];

  for (let i = 1; i <= 6; i++) {
    dice.push(
      <div class={`dice n${i}`}>
        {Array.from({ length: i }, () => (
          <div class="point" />
        ))}
      </div>
    );
  }

  return <div class="dice-box">{...dice}</div>;
};

const Roll = (turn: string) => {
  const btn = document.querySelector('.roll') as HTMLButtonElement;
  const dice = document.querySelector(`.dice-container.${turn} .dice-box`) as HTMLDivElement;

  btn.innerHTML = '...';
  btn.disabled = true;

  const randomDice = () => {
    const random = Math.floor(1 + Math.random() * 6);

    console.log(random);

    rollDice(random);
  };

  const rollDice = (random: number) => {
    dice.style.animation = 'rolling 4s';

    setTimeout(() => {
      switch (random) {
        case 1:
          dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
          break;

        case 2:
          dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
          break;

        case 3:
          dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
          break;

        case 4:
          dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
          break;

        case 5:
          dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
          break;

        case 6:
          dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
          break;
      }

      dice.style.animation = 'none';

      moves[random.toString()] += 1;

      console.log(moves);

      if (random === 6) {
        setTimeout(() => randomDice(), 1000);
        if (moves['6'] === 3) {
          NextTurn(turn);
        }
      } else {
        Turn(moves, turn);
        setTimeout(() => {
          btn.innerHTML = 'Roll';
          btn.disabled = false;
        }, 1000);
      }
    }, 4050);
  };

  randomDice();
};

const NextTurn = (previousTurn: string) => {
  return '';
};

const Turn = (moves, turn) => {
  if (turn === 'green') {
    if (moves['1'] === 0 && moves['6'] === 0 && greenPieces[0].pos === 0 && greenPieces[1].pos === 0 && greenPieces[2].pos === 0 && greenPieces[3].pos === 0) {
    }
  }
};

const StartBoxes = ({ type }: { type: string }) => (
  <>
    <div class="start-box">
      <ChessPiece classes={`${type} piece n-1`} />
    </div>
    <div class="start-box">
      <ChessPiece classes={`${type} piece n-2`} />
    </div>
    <div class="start-box">
      <ChessPiece classes={`${type} piece n-3`} />
    </div>
    <div class="start-box">
      <ChessPiece classes={`${type} piece n-4`} />
    </div>
  </>
);

const MovesBoxesGreen = () => (
  <>
    <div class="box-move n6" />
    <div class="box-move n7" />
    <div class="box-move n8" />
    <div class="box-move n5" />
    <div class="box-move box-bg e1" />
    <div class="box-move box-circle n9" />
    <div class="box-move box-star n4" />
    <div class="box-move box-bg e2" />
    <div class="box-move n10" />
    <div class="box-move n3" />
    <div class="box-move box-bg e3" />
    <div class="box-move n11" />
    <div class="box-move n2" />
    <div class="box-move box-bg e4" />
    <div class="box-move n12" />
    <div class="box-move n1" />
    <div class="box-move box-bg e5" />
    <div class="box-move n13" />
  </>
);

const MovesBoxesRed = () => (
  <>
    <div class="box-move n8" />
    <div class="box-move box-circle n9" />
    <div class="box-move n10" />
    <div class="box-move n11" />
    <div class="box-move n12" />
    <div class="box-move n13" />
    <div class="box-move n7" />
    <div class="box-move box-bg e1" />
    <div class="box-move box-bg e2" />
    <div class="box-move box-bg e3" />
    <div class="box-move box-bg e4" />
    <div class="box-move box-bg e5" />
    <div class="box-move n6" />
    <div class="box-move n5" />
    <div class="box-move box-star n4" />
    <div class="box-move n3" />
    <div class="box-move n2" />
    <div class="box-move n1" />
  </>
);

const MovesBoxesYellow = () => (
  <>
    <div class="box-move n1" />
    <div class="box-move n2" />
    <div class="box-move n3" />
    <div class="box-move box-star n4" />
    <div class="box-move n5" />
    <div class="box-move n6" />
    <div class="box-move box-bg e5" />
    <div class="box-move box-bg e4" />
    <div class="box-move box-bg e3" />
    <div class="box-move box-bg e2" />
    <div class="box-move box-bg e1" />
    <div class="box-move n7" />
    <div class="box-move n13" />
    <div class="box-move n12" />
    <div class="box-move n11" />
    <div class="box-move n10" />
    <div class="box-move box-circle n9" />
    <div class="box-move n8" />
  </>
);

const MovesBoxesBlue = () => (
  <>
    <div class="box-move n13" />
    <div class="box-move box-bg n5" />
    <div class="box-move n1" />
    <div class="box-move n12" />
    <div class="box-move box-bg e4" />
    <div class="box-move n2" />
    <div class="box-move n11" />
    <div class="box-move box-bg e3" />
    <div class="box-move n3" />
    <div class="box-move n10" />
    <div class="box-move box-bg e2" />
    <div class="box-move box-star n4" />
    <div class="box-move box-circle n9" />
    <div class="box-move box-bg e1" />
    <div class="box-move n5" />
    <div class="box-move n8" />
    <div class="box-move n7" />
    <div class="box-move n6" />
  </>
);

export default function Home() {
  return (
    <div class="main">
      <div class="start red">
        <StartBoxes type="red" />
      </div>
      <div class="moves green">
        <MovesBoxesGreen />
      </div>
      <div class="start green">
        <StartBoxes type="green" />
      </div>
      <div class="moves red">
        <MovesBoxesRed />
      </div>
      <div class="end" />
      <div class="moves yellow">
        <MovesBoxesYellow />
      </div>
      <div class="start blue">
        <StartBoxes type="blue" />
      </div>
      <div class="moves blue">
        <MovesBoxesBlue />
      </div>
      <div class="start yellow">
        <StartBoxes type="yellow" />
      </div>
      <div class="dice-containers">
        <div class="dice-container red">
          <Dice />
        </div>
        <div class="dice-container green">
          <Dice />
        </div>
        <div class="dice-container blue">
          <Dice />
        </div>
        <div class="dice-container yellow">
          <Dice />
        </div>
      </div>
      <div class={`info-box ${turn()}`}>
        <p class="turn-text">It's {turn()} turn!</p>
        <p class="instructions">{instructions()}</p>
        <button class="roll" onClick={() => Roll(turn())}>
          Roll
        </button>

        <div class="progress-bar" />
      </div>
    </div>
  );
}
