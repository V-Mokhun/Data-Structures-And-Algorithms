export const knapsack = (
  n: number,
  profits: number[],
  weights: number[],
  capacity: number
) => {
  const dp = (profit: number, leftCapacity: number, index: number): number => {
    if (leftCapacity < 0) return 0;
    if (index === n) return profit;

    return Math.max(
      dp(profit + profits[index], leftCapacity - weights[index], index + 1),
      dp(profit, leftCapacity, index + 1)
    );
  };

  return dp(0, capacity, 0);
};

console.log(knapsack(3, [60, 100, 120], [10, 20, 30], 50));
