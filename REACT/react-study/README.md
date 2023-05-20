# Recoil State-managment

## Atom usage

## Selector usage

-   Tip : Recoiljs Snippets Extension 이용 시, 자동 완성 기능

### default usage

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
