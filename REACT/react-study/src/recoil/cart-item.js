import { atom, selector } from 'recoil';

export const CartItemAtom = atom({
    key: 'CartItemAtom',
    default: [],
});

export const TotalQuantitySelector = selector({
    key: 'TotalQuantitySelector',
    get: ({ get }) => {
        const CartItem = get(CartItemAtom);
        return CartItem.length;
    },
});

export const TotalPriceSelector = selector({
    key: 'TotalPriceSelector',
    get: ({ get }) => {
        const CartItem = get(CartItemAtom);
        return CartItem.reduce((acc, curr) => acc + curr.price, 0);
    },
});
