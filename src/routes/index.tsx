import { For, createEffect, createSignal, on, splitProps } from 'solid-js';
import { render } from 'solid-js/web';

import { Tick, Cross } from '~/components/SVGs';

const [turn, setTurn] = createSignal(1); // 1 = Tick & 2 = Cross
const [help, setHelp] = createSignal("It's Tick player turn!"); // Gives player instructions
const [boxFilled, setBoxFilled] = createSignal([0, 0, 0, 0, 0, 0, 0, 0, 0]); // Saves each player move
const [hasWon, setHasWon] = createSignal(false); // If Won then locks the click boxes
const [score, setScore] = createSignal({ tick: 0, cross: 0, draw: 0 });
const [state, setState] = createSignal({ status: 'turn', player_won: 0, draw: false });
const boxChecks = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Home() {
  createEffect(() => {
    if (state().status === 'turn') {
      if (turn() === 1) {
        setHelp("It's Tick player turn!");
      } else {
        setHelp("It's Cross player turn!");
      }
    }
  });

  createEffect(
    on(state, () => {
      if (state().status === 'finish') {
        if (state().player_won === 1) {
          setHelp('Tick Player has won!');
          setScore({ ...score(), tick: score().tick + 1 });
        } else if (state().player_won === 2) {
          setHelp('Cross Player has won!');
          setScore({ ...score(), cross: score().cross + 1 });
        }

        if (state().draw) {
          setHelp("It's a draw!");
          setScore({ ...score(), draw: score().draw + 1 });
        }
      }
    })
  );

  return (
    <div class="content">
      <div class="wins">
        <div class="tick-wins">Tick Wins: {score().tick}</div>
        <div>Draw: {score().draw}</div>
        <div class="cross-wins">Cross Wins: {score().cross}</div>
      </div>
      <div class={`box-container ${hasWon() ? 'box-lock' : ''}`}>
        <For each={Array(9)}>{(_, i) => <FillBox number={i() + 1} />}</For>
      </div>
      <div class="help-box">
        <p class={`help-text ${state().player_won === 1 ? 'tick-wins' : state().player_won === 2 ? 'cross-wins' : ''}`}>{help()}</p>
        <div class={`help-bar ${hasWon() ? 'active' : ''}`} />
      </div>
    </div>
  );
}

interface FillBox {
  number: number;
}

const FillBox = (props: FillBox) => {
  const [local] = splitProps(props, ['number']);

  const Check = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.innerHTML === '') {
      const targetIndex = parseInt(target.getAttribute('data-index') || ''); // Get data-index of the clicked box
      if (turn() === 1) {
        setBoxFilled((occupy) => {
          occupy[targetIndex] = 1;
          return occupy;
        });
        render(Tick, target);
        setTurn(2);
      } else {
        setBoxFilled((occupy) => {
          occupy[targetIndex] = 2;
          return occupy;
        });
        render(Cross, target);
        setTurn(1);
      }

      CheckWin(); // Check if any player has won after each turn
    }
  };

  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  return <div onClick={(e) => Check(e)} data-index={local.number - 1} class={`box box-${local.number}`} />;
};

const Reset = () => {
  setHasWon(true);

  setTimeout(() => {
    setHasWon(false);
    setTurn(1);
    setHelp("It's Tick player turn!");
    setBoxFilled([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setState({ status: 'turn', player_won: 0, draw: false });
    const fillBoxes = document.querySelectorAll('.box-container .box');
    fillBoxes.forEach((fillBox) => (fillBox.innerHTML = ''));
  }, 3000);
};

const CheckWin = () => {
  let isDraw = true;

  boxChecks.forEach((check) => {
    const num1 = boxFilled()[check[0]];
    const num2 = boxFilled()[check[1]];
    const num3 = boxFilled()[check[2]];

    if (num1 === num2 && num2 === num3 && num3 !== 0) {
      setState({ ...state(), status: 'finish', player_won: num1 });

      Reset();
    } else if (num1 === 0 || num2 === 0 || num3 === 0) {
      isDraw = false;
    }
  });

  if (isDraw && state().status === 'turn') {
    setState({ ...state(), status: 'finish', draw: true });

    Reset();
  }
};
