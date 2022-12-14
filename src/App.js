import "./App.css";
import { useState } from "react";
import SummaryPage from "./pages/SummaryPage/SummaryPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import { OrderContextProvider } from "./contexts/OrderContext";

function App() {
  const [counter, setCounter] = useState(0);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="App">
      <OrderContextProvider>
        <OrderPage />
      </OrderContextProvider>

      {/* <header className="App-header">
        <h3 data-testid="counter">{counter}</h3>
        <div>
          <button
            data-testid="minus-button"
            onClick={() => {
              setCounter((count) => count - 1);
            }}
            disabled={disabled}
          >
            -
          </button>
          <button
            data-testid="plus-button"
            onClick={() => {
              setCounter((count) => count + 1);
            }}
            disabled={disabled}
          >
            +
          </button>
        </div>
        <div>
          <button
            data-testid="on/off-button"
            style={{ backgroundColor: "blue" }}
            onClick={() => {
              setDisabled((prev) => !prev);
            }}
          >
            on/off
          </button>
        </div>
      </header> */}
      {/* <SummaryPage /> */}
    </div>
  );
}

export default App;
