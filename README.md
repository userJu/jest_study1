## 테스트의 중요성

<br/>

### 테스트 코드 연습해보기

<br/>

### expect와 matcher

- [expect](https://mulder21c.github.io/jest/docs/en/next/expect)<br/>
  값을 테스트할 때마다 사용한다.<br/>
  expect 함수 혼자서는 거의 사용하지 않으며 matcher와 함께 사용한다

- [matcher](https://mulder21c.github.io/jest/docs/en/next/using-matchers)<br/>
  다른 방법으로 값을 테스트 하도록 '매처'를 사용한다

  <br/>
  <br/>

### 쿼리 함수란?

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

<br/>
<br/>

## settings

<br/>

### ESLint

- eslint 익스텐션 설치(한번만)
- .eslintrc.json 파일 생성
  ```json
  {
    "extends": ["react-app", "react-app/jest"]
  }
  ```
  위 내용 package.json에서는 삭제
  .eslintrc.json 파일에 삽입
- ESLint Testing Plugins 설치<br/>
  react / test 등 원하는 사용방법에 맞는 플러그인을 설치<br/>
  (현재 테스트를 위해서는)<br/>
  `npm install eslint-plugin-testing-library`<br/>
  => render로 DOM을 그리는 부분 <br/>
  `npm install eslint-plugin-jest-dom`<br/>
  => expect-matcher테스트 <br/>
  <br/>
  설치<br/>
  ` npm install eslint-plugin-testing-library eslint-plugin-jest-dom --save-dev`

<br/>

#### 내부 설정

```json
// .eslintrc.json
{
  "plugins": ["testing-library", "jest-dom"],
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:testing-library/react",
    // react에 관한 규칙을 정한다
    "plugin:jest-dom/recommended"
  ]
}
```

- plugins : 플러그인 추가.
- extends : 플러그인을 추가한 후 규칙을 정해줘야 사용 가능.<br/>
  따라서 사용하고자 하는 규칙 설정 <br/>
  recommended는 추천되게 하는 것<br/>
  규칙을 변경하고자 할 때는 rule 항목을 추가

<br/>

#### 확인하기

test 코드에

```javascript
const lintTest = screen.getByRole("button", {
  name: "lintTest",
});
expect(lintTest.textContent.toBe("lintTest"));
```

을 작성했을 때 오류가 뜨면 성공(테스팅을 위한 더 좋은 방법을 알려줌)

### Pritter

- 익스텐션으로 설치하거나
- npm 으로 설치하기
