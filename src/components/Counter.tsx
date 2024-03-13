import { useState } from "react";

export function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="Counter">
      <p>Counter currently is: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Click Me</button>
    </div>
  );
}
