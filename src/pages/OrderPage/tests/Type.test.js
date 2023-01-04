import { render, screen } from "@testing-library/react";
import Type from "../Type";

test("display product images from server", async () => {
  render(<Type orderType="products" />);

  const productImages = await screen.findAllByRole("img", {
    name: /product$/i,
  });
  expect(productImages).toHaveLength(2);

  const altText = productImages.map((element) => element.alt);
  expect(altText).toEqual(["America product", "England product"]);
});
// 비동기일 경우는 async await을 포함시켜줘야 한다
