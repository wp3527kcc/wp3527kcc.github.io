import { useState, useCallback, lazy, Suspense, useRef } from "react";
import { Button, Space } from "antd";
import { makeAutoObservable } from "mobx";
// import { observable } from "rxjs";
import { observer } from "mobx-react";

// import Demo from "../components/Demo";

import "./App.css";

type TodoItem = {
  text: string;
  key: number;
};

// 对应用状态进行建模。
class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increase() {
    this.secondsPassed += 1;
  }

  reset() {
    this.secondsPassed = 0;
  }
}

const myTimer = new Timer();

function debounce<T extends any[]>(fun: (...args: T) => any, time: number) {
  let lastTime = 0;
  return (...args: T) => {
    if (Date.now() - lastTime > time) {
      fun(...args);
    }
    lastTime = Date.now();
  };
}
function throttle<T extends any[]>(fun: (...args: T) => any, time: number) {
  let flag = true;
  return (...args: T) => {
    if (!flag) return;
    fun(...args);
    flag = false;
    setTimeout(() => {
      flag = true;
    }, time);
  };
}

function Loading() {
  return <h4>loading...</h4>;
}

// 构建一个使用 observable 状态的“用户界面”。
const TimerView = observer(
  ({
    timer,
  }: {
    timer: { reset: () => void; increase: () => void; secondsPassed: number };
  }) => {
    return (
      <Space>
        <button onClick={() => timer.increase()}>
          已过秒数：{timer.secondsPassed}
        </button>
        <button onClick={() => timer.reset()}>重置</button>
      </Space>
    );
  }
);
// async function delayForDemo(promise: any) {
//   await new Promise((resolve) => {
//     setTimeout(resolve, 1000);
//   });
//   return promise;
// }
let keyCount = 0;
console.log(this);
const Demo = lazy(() => {
  return import("../components/Demo");
  // return delayForDemo(import("../components/Demo"));
});
function App() {
  const [count, setCount] = useState(0);
  const [, setShowDemo] = useState(false);
  const [todos, setTodos] = useState<Array<TodoItem>>([]);
  // const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>();
  // useEffect(() => {
  //   // 每秒更新一次‘已过秒数：X’中的文本。
  //   setInterval(() => {
  //     myTimer.increase();
  //   }, 1000);
  //   setTimeout(() => {
  //     setInterval(() => {
  //       myTimer.reset();
  //     }, 5000);
  //   }, 500);
  // }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">kcc Blog 0522</h1>
      <div className="card">
        <Button
          onClick={useCallback(
            debounce(() => {
              setCount((count) => count + 1);
            }, 1000),
            []
          )}
        >
          debounce is {count}
        </Button>
        <Button
          onClick={useCallback(
            throttle(() => {
              setCount((count) => count + 1);
            }, 1000),
            []
          )}
        >
          throttle is {count}
        </Button>
        <Button onClick={() => setCount(0)}>reset</Button>
        <br />
        <input
          ref={(ref) => (inputRef.current = ref as HTMLInputElement)}
        ></input>
        {/* <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        ></input> */}
        <Button
          type="primary"
          onClick={() => {
            const inputValue = inputRef.current!.value;
            if (!inputValue) return;
            setTodos((todos) => [
              ...todos,
              { text: inputValue, key: keyCount++ },
            ]);
            inputRef.current!.value = "";
          }}
        >
          append
        </Button>
        <ul>
          {todos.map((each) => (
            <li key={each.key}>
              <span>{each.text}</span>
              <input />
              <Button
                type="dashed"
                danger
                onClick={() => {
                  setTodos((todos) =>
                    todos.filter((item) => item.key !== each.key)
                  );
                }}
              >
                x
              </Button>
            </li>
          ))}
        </ul>
        <TimerView timer={myTimer} />
        <Button
          type="primary"
          onClick={() => {
            setShowDemo((showDemo) => !showDemo);
          }}
        >
          toggle
        </Button>
        <Suspense fallback={<Loading />}>
          <h2>Preview: {Date.now()}</h2>
          <Demo msg="hello world" />
        </Suspense>
      </div>
    </>
  );
}

export default App;
