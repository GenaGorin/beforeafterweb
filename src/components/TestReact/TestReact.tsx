import React, { useCallback, useEffect, useMemo, useState } from "react";

const sum = (n: number) => {
  console.log("sum called");

  return n + n;
};

const TestReact = () => {
  const [num, setNum] = useState(1);
  const [isGreen, setIsGreen] = useState(true);
  const result = useMemo(() => sum(num), [num]);

  return (
    <div>
      <h1
        onClick={() => setIsGreen(!isGreen)}
        style={{ color: isGreen ? "green" : "red" }}
      >
        Example
      </h1>
      <h2>Sum {result}</h2>
      <button onClick={() => setNum(num + 1)}>➕</button>
      <TextComponent text={"Hello world " + num} />
    </div>
  );
};

const TextComponent = React.memo(({ text }: any) => {
  console.log("render text component");

  return <p>{text}</p>;
});

export default TestReact;
