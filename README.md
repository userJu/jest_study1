## 테스트의 중요성

### 테스트 코드 연습해보기

#### 쿼리 함수란?

쿼리는 페이지에서 요소를 찾기 위해 테스트 라이브러리가 제공하는 방법으로,

- getBy

  ```
  🍒 일치한다면?

  - 쿼리에 대해 일치하는 노드를 반환

  🍏 일치하지 않는다면?

  - 둘 이상의 요소와 일치하거나 하나도 없을 경우에는 설명 오류를 발생시킨다

  (만약 둘 이상의 요소와 일치해야 할 때는 getAllBy를 사용한다)
  ```

- queryBy

  ```
  🍒 일치한다면?

  - 쿼리에 대해 일치하는 노드를 반환

  🍏 일치하지 않는다면?

  - 둘 이상의 요소와 일치한다면 오류 발생
  - 일치하는 요소가 없다면 null 반환
    => `Received has value: null`
  ```

- findBy ( = getBy + waitFor)

  ```
  🍒 일치한다면?

  - Promise를 반환

  🍏 일치하지 않는다면?

  - 하나도 없거나 1000ms 후에 둘 이상의 요소가 발견되면 약속이 거부된다.

  (만약 둘 이상의 요소를 찾아야 할 때는 findAllBy를 사용한다)
  ```

  - waitFor</br>
    일정 기간 기다려야 할 때 기대가 통과할 때까지 기다릴 수 있다

  </br>
  등 여러 유형의 쿼리가 있다.

  </br>

만약 요소가 발견되지 않았을 때

- 쿼리에서 오류 발생
- Promise를 반환하고 다시 시도
  하는지 여부에 따라 적절한 쿼리를 선택해야 한다

```javascript
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  // DOM에 컴포넌트를 렌더링
  // 인자로 렌더링할 React 컴포넌트가 들어간다

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```
