const SIZE = 8; // 应统一到const中管理

// 判断某个位置是否是合法走法
export const isValidMove = (board, row, col, color) => {
  if (board[row][col] !== null) return false;

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1], // 上下左右
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1], // 四个对角线
  ];

  let isValid = false;

  directions.forEach(([dx, dy]) => {
    let r = row + dx;
    let c = col + dy;
    let foundOpponent = false;

    while (r >= 0 && r < SIZE && c >= 0 && c < SIZE) {
      const cell = board[r][c];
      if (cell === null) break;
      if (cell === color) {
        if (foundOpponent) {
          isValid = true;
        }
        break;
      }
      foundOpponent = true;
      r += dx;
      c += dy;
    }
  });

  return isValid;
};

