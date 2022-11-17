# 테스트

<br/>

## 테스트 코드 연습해보기

<br/>

### expect와 matcher

- [expect](https://mulder21c.github.io/jest/docs/en/next/expect)<br/>
  값을 테스트할 때마다 사용한다.<br/>
  expect 함수 혼자서는 거의 사용하지 않으며 matcher와 함께 사용한다

- [matcher](https://mulder21c.github.io/jest/docs/en/next/using-matchers)<br/>
  다른 방법으로 값을 테스트 하도록 '매처'를 사용한다

  <br/>
  <br/>

## 쿼리 함수란?

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

### 내부 설정

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

### 확인하기

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

<br/>
<br/>
<br/>

## 테스트의 중요성

<br/>

### Test Driven Development란?

- 실제 코드 작성 전, 테스트 코드를 먼저 작성한다
- 테스트코드를 작성하고 그 테스트 코드를 Pass할 수 있는 실제 코드를 작성하는 것

#### 장점

1. 많은 기능을 테스트하기 때문에 코드에 안정감이 부여
2. 개발하면서 많은 시간이 소요되는 디버깅 시간이 줄어들고 실제 개발 시간도 줄어든다
3. 소스 코드 하나하나를 신중하게 작성하기 때문에 좋은 코드를 작성할 수 있다

<br/>
<br/>
<br/>

## 테스트 작성하기

<br/>

### FireEvent API

유저가 발생시키는 액션(이벤트)에 대한 테스트를 해야 하는 경우에 사용

```javascript
test("When the + button is pressed, the counter changes to 1", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("plus-button");
  fireEvent.click(buttonElement);
  const counterElement = screen.getByTestId("counter");
  expect(counterElement).toHaveTextContent(1);
});
```

<br/>
<br/>

## userEvent API

전에 FireEvent Api를 사용해서 이벤트 테스트를 처리해줬다.<br/>
그러나 사실 FireEvent를 사용하는 것 보다 userEvent를 사용해서 이벤트를 테스트하는 것이 더 좋은 방법이라고 한다!<br/>
<br/>

### fireEvent vs userEvent

fireEvent를 사용해서 만들어졌다.<br/>
userEvent의 내부 코드를 보면 fireElement를 사용한다.<br/>
그런데 element의 타입에 따라서 더 적절한 반응을 보여준다<br/>

- label을 클릭했을 때
- checkbox를 클릭했을 때
- radio를 클릭했을 때

userEvent는 이 타입에 따라서 다 다른 반응을 해준다
<br/>
fireEvent로 버튼을 클릭하면 fireEvent.click(button)버튼이 focus되지 않는다.<br/>
하지만 userEvent로 클릭하면
userEvent.click(button) 버튼이 focus된다.<br/>

따라서 실제 사용하는 유저가 보기에 실제 버튼을 클릭하는 행위가 더 잘 표현되기에 'userEvent'를 사용하는 것을 더 추천!

## Query 사용 우선 순위

<br/>

> 현재가지는 `getByTestId` 쿼리를 이용해서 엘레먼트에 접근.
> 테스트를 진행했다
> 하지만 testing library에서 추천하는 쿼리 사용 우선 순위가 따로 있다!!

<br/>

1. 모든 사람에게 접근 가능한 코드를 사용해야 한다<br/>
   - 보조 기기를 사용하는 유저의 경험을 반영해야 한다
     <br/>
     `getByTestId`대신 `getByRole`을 이용하는 것이 좋다
     <br/>
     `getByRole('button', {name:/subnit/i})`
     i는 대소문자를 구분하지 않겠다는 표시
     <br/>
   - `getByLabelText`은 label이 있는 input의 label 내용으로 input을 선택한다
   - `getByPlaceholderText`은 placeholder값으로 input과 textarea를 선택한다
   - `getByText`는 element가 가지고 있는 text값으로 DOM을 선택한다

<br/>

2. Semantic Queries<br/>
   - element가 alt를 지원한다면 `getByAltText`를 이용하는 것이 좋다
     <br/>
   - title 속성을 가지고 있는 DOM이나 title element를 가지고 있는 SVG를 선택한다면 `getByTitle`을 사용하는 것이 좋다

<br/>

3. Test IDs<br/>

- 어떠한 경우에도 사용할 수 없을 때 `getByTestId`
