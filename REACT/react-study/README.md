# Recoil State-managment

## Atom usage

### syntax

```js
export const ATOM변수명 = atom({
    key: 'primaryKey',
    default: // 형태는 자유롭게!
});
```

### practice

```js
export const CartItemAtom = atom({
    key: 'CartItemAtom',
    default: [],
});
```

리액트에서 import

```js
// 기본 적인 import 형태 , useState([])와 동일하다
const [cartItem, setCartItem] = useRecoilState(CartItemAtom);

// Value 값만 필요할 경우
const cartItem = useRecoilValue(CartItemAtom);
```

## Selector usage

-   Tip : Recoiljs Snippets Extension 이용 시, 자동 완성 기능

### syntax

```js
const Selector = selector({
    key : '키값',
    get : ({get} => {
        const 원본 = get(아톰)
        return 원본변형값
    })
})
```

### practice

CartItem 배열의 총 수량 구하기

```js
export const TotalQuantitySelector = selector({
    key: 'TotalQuantitySelector',
    get: ({ get }) => {
        const CartItem = get(CartItemAtom);
        return CartItem.length;
    },
});
```

CartItem 배열의 총 가격 구하기

```js
export const TotalPriceSelector = selector({
    key: 'TotalPriceSelector',
    get: ({ get }) => {
        const CartItem = get(CartItemAtom);
        return CartItem.reduce((acc, curr) => acc + curr.price, 0);
    },
});
```

리액트에서 import

```js
// selector도 마찬가지다. selector로직 중 value값만 필요로 할 시, userRecoilValue만 호출한다
const TotalQuantity = useRecoilValue(TotalQuantitySelector);
```
