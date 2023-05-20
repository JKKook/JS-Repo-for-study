import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import CartItem from '../components/Molecules/CartItem';
import {
    CartItemAtom,
    TotalPriceSelector,
    TotalQuantitySelector,
} from '../recoil/cart-item';

export default function Cart() {
    // 전역 상태 관리를 시도해보자
    const cartItem = useRecoilState(CartItemAtom);
    console.log('CartItem :', cartItem);

    // 파생데이터인 셀렉터를 이용해야해요 (총 개수 구하기)
    const TotalQuantity = useRecoilValue(TotalQuantitySelector);

    // 파생데이터인 셀렉터를 이용해야해요 (총 가격 구하기)
    const TotalPricce = useRecoilValue(TotalPriceSelector);

    return (
        <>
            <Heading>장바구니</Heading>

            <ItemWrapper>
                {cartItem.length ? (
                    cartItem.map((item) => (
                        <CartItem data={item} key={item.id} />
                    ))
                ) : (
                    <NoItems>카트에 상품이 존재하지 않습니다</NoItems>
                )}
            </ItemWrapper>

            <TotalPriceWrapper>
                <ColumnWrapper>
                    <span>총 개수 {TotalQuantity}</span>
                    <Heading></Heading>
                </ColumnWrapper>
                <ColumnWrapper>
                    <span>총 가격 {TotalPricce}</span>
                    <Heading></Heading>
                </ColumnWrapper>
            </TotalPriceWrapper>
        </>
    );
}

const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
`;

const Heading = styled.span`
    font-size: 20px;
    font-weight: var(--bold);
`;
const ItemWrapper = styled.ul`
    display: flex;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 300px);
    gap: 8px;
    flex-direction: column;
`;
const TotalPriceWrapper = styled.div`
    padding: 16px;
    height: 150px;
    width: 100%;
    max-width: 1024px;
    border: 1px solid var(--line-gray);
    & span {
        text-align: right;
    }
`;
const NoItems = styled.div`
    padding: 8px;
    width: fit-content;
    margin: 0 auto;
    border-radius: 4px;
    text-align: center;
    border: 1px solid var(--line-gray);
`;
