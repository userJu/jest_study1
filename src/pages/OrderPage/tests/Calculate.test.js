import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Type from "../Type";

test("update product's total when products change", async () => {
  render(<Type orderType="products" />);

  const productsTotal = screen.getByText("상품 총 가격:", { exact: false });
  // exact : false => 상품 총 가격: 뒤에 다른 것이 나와도 getByText로 잡아낼 수 있다
  expect(productsTotal).toHaveTextContent("0");

  // america 여행 상품 한 개 올리기
  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });
  // getByRole이 아니라 findByRole인 이유
  // 이 부분도 결국에는 서버에서 여행 상품에 대한 여행 상품을 가지고 온 다음이라.
  // findByRole을 쓸 때 async await을 쓰면 된다

  userEvent.clear(americaInput);
  userEvent.type(americaInput, "1");
  expect(productsTotal).toHaveTextContent("1000");
});
