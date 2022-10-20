import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("the counter starts at 0", () => {
  // DOM에 컴포넌트를 렌더링
  // 인자로 렌더링할 React 컴포넌트가 들어간다
  render(<App />);

  // screen object를 이용해서 원하는 엘리먼트에 접근
  const counterElement = screen.getByTestId("counter");

  // id가 counter인 엘리먼트의 텍스트가 0인지 테스트
  expect(counterElement).toHaveTextContent(0);
});

test("minus button has correct text", () => {
  render(<App />);
  const minusButtonElement = screen.getByTestId("minus-button");
  expect(minusButtonElement).toHaveTextContent("-");
});

test("plus button has correct text", () => {
  render(<App />);
  const plusButtonElement = screen.getByTestId("plus-button");
  expect(plusButtonElement).toHaveTextContent("+");
});

test("When the + button is pressed, the counter changes to 1", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("plus-button");
  fireEvent.click(buttonElement);
  const counterElement = screen.getByTextId("counter");
  expect(counterElement).toHaveTextContent(1);
});

test("When the - button is pressed, the counter changes to -1", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("minus-button");
  fireEvent.click(buttonElement);
  const counterElement = screen.getByTextId("counter");
  expect(counterElement).toHaveTextContent(-1);
});
