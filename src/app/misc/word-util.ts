export function details(goal: string, word: string): string {
  const result = ["w", "w", "w", "w", "w"];
  const g = goal.split('');
  const w = word.split('');
  w.forEach((value, i) => {
    if (w[i] === g[i]) {
      result[i] = "p";
      g[i] = "!";
      w[i] = "!";
    }
  })
  w.forEach((value, i) => {
    if (w[i] === "!") {
      return;
    }
    const gi = g.findIndex((gl) => {return gl === w[i]});
    if (gi === -1) {
      result[i] = "w";
      return;
    }
    result[i] = "l";
    g[gi] = "!";
  })
  return result.join("");
}
