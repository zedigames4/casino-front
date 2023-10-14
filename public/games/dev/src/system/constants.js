/*this file is imported in index.html*/
// You can then extract the query parameter using string manipulation or a library like URLSearchParams
const searchParams = new URLSearchParams(window.location.search);
const playType = searchParams.get('play-type') || 'production'; // returns "JavaScript"
const playTypes = {
  demo: 'demo',
};
const ids = {
  diceGame: {
    id: '635102f389a59c1114a40464',
  },
  horseRacing: {
    id: 'horse_racing',
  },
  plinko: {
    id: 'plinko',
  },
  roulette_royale: {
    id: 'roulette_royale',
  },
  commonId: window.location.pathname.split('/')[2],
};

let wallet = undefined;

const variables = {
  dice: {
    recentBetId: undefined,
  },
  horseRacing: {
    recentBetId: undefined,
  },
  roulette_royale: {
    recentBetId: undefined,
  },
  plinko: {
    recentBetId: undefined,
  },
};
function switchToDemo() {
  window.location.href = `${window.location.href}?play-type=demo`;
}
