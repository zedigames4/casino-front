export default interface BetsInterface {
  _id: string;
  user: {
    firstName: 'Admin';
    lastName: 'Zeddi2';
    email: 'admin@playinrwanda.com';
  };
  game: {
    title: 'dice-game';
  };
  iWin: 0;
  iToBet: 0;
  playerData: object;
}
