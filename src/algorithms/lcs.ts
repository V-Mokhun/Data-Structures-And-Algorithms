export const lcs = (str1: string, str2: string): number => {
  const n = str1.length;
  const m = str2.length;
  const dp = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    dp[i] = new Array(m + 1).fill(0);
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (str1[i - 1] === str2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
    }
  }

  return dp[n][m];
};

console.log(lcs("apple", "app")); // 3
console.log(lcs("application", "app")); // 3
console.log(lcs("banana", "bandana")); // 6
console.log(lcs("abc", "def")); // 0
console.log(lcs("hello", "world")); // 1
