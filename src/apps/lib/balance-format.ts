export const formatBalance = (
  balance: string | number | null,
): string | null => {
  if (balance === null) {
    return null;
  }

  if (typeof balance === 'string') {
    return (+balance).toFixed(2);
  }

  return balance.toFixed(2);
};
