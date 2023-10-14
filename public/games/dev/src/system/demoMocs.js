export const getDemoWallet = () => {
  return {
    _id: 'demoId',
    user: {
      firstName: 'Demo',
      email: 'demo@zedi.rw',
    },
    expenses: 0,
    income: 0,
    balance: 3500000,
    balanceInCoin: 3500,
  };
};
