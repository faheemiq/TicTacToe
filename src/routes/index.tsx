import { For, createEffect, createSignal, splitProps } from 'solid-js';
import { render } from 'solid-js/web';

const [turn, setTurn] = createSignal(1); // 1 = Tick & 2 = Cross
const [help, setHelp] = createSignal("It's Tick player turn!"); // Gives player instructions
const [boxFilled, setBoxFilled] = createSignal([0, 0, 0, 0, 0, 0, 0, 0, 0]); // Saves each player move
const [hasWon, setHasWon] = createSignal(false); // If Won then locks the boxes

createEffect(() => {
  if (turn() === 1) {
    setHelp("It's Tick player turn!");
  } else {
    setHelp("It's Cross player turn!");
  }
});

export default function Home() {
  return (
    <div class="content">
      <div class={`box-container ${hasWon() ? 'box-lock' : ''}`}>
        <For each={Array(9)}>{(_, i) => <FillBox number={i() + 1} />}</For>
      </div>
      <div class="help-box">
        <p class="help-text">{help()}</p>
        <div class={`help-bar ${hasWon() ? 'active' : ''}`} />
      </div>
    </div>
  );
}

// const FillBoxes = () => {

// }

interface FillBox {
  number: number;
}

const FillBox = (props: FillBox) => {
  const [local] = splitProps(props, ['number']);

  const Check = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.innerHTML === '') {
      const targetIndex = parseInt(target.getAttribute('data-index') || '');
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
    const fillBoxes = document.querySelectorAll('.box-container .box');
    fillBoxes.forEach((fillBox) => (fillBox.innerHTML = ''));
  }, 3000);
};

const CheckWin = () => {
  const AreEqual = (num1: number, num2: number, num3: number) => {
    if (num1 === num2 && num2 === num3 && num3 !== 0) {
      return { hasWon: true, player: num1 };
    } else {
      return { hasWon: false, player: num1 };
    }
  };

  const check1 = AreEqual(boxFilled()[0], boxFilled()[1], boxFilled()[2]);
  const check2 = AreEqual(boxFilled()[3], boxFilled()[4], boxFilled()[5]);
  const check3 = AreEqual(boxFilled()[6], boxFilled()[7], boxFilled()[8]);
  const check4 = AreEqual(boxFilled()[0], boxFilled()[3], boxFilled()[6]);
  const check5 = AreEqual(boxFilled()[1], boxFilled()[4], boxFilled()[7]);
  const check6 = AreEqual(boxFilled()[2], boxFilled()[5], boxFilled()[8]);
  const check7 = AreEqual(boxFilled()[0], boxFilled()[4], boxFilled()[8]);
  const check8 = AreEqual(boxFilled()[2], boxFilled()[4], boxFilled()[6]);
  const checks = [check1, check2, check3, check4, check5, check6, check7, check8];
  checks.forEach((check) => {
    if (check.hasWon) {
      if (check.player === 1) {
        setHelp('Tick Player has won!');
      } else {
        setHelp('Cross Player has won!');
      }

      Reset();
    }
  });
};

const Tick = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
    <path d="M378 798q-6 0-11-2t-10-7L176 608q-9-9-9-22t9-22q9-9 21-9t21 9l160 160 363-363q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5L399 789q-5 5-10 7t-11 2Z" />
  </svg>
);

const Cross = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
    <path d="M480 618 270 828q-9 9-21 9t-21-9q-9-9-9-21t9-21l210-210-210-210q-9-9-9-21t9-21q9-9 21-9t21 9l210 210 210-210q9-9 21-9t21 9q9 9 9 21t-9 21L522 576l210 210q9 9 9 21t-9 21q-9 9-21 9t-21-9L480 618Z" />
  </svg>
);
