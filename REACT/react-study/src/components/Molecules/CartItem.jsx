import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CartItemAtom } from '../../recoil/cart-item';

export default function CartItem({ data }) {
    // 전역 관리를 해보아요
    // useSetRecoilState state없이 setState만 불러와서 사용
    const setCartItem = useSetRecoilState(CartItemAtom);

    const { id, title, description, price, img } = data;

    // 아이템 삭제를 구현해보자
    const removeCartItem = () => {
        setCartItem((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <Wrapper>
            <div>
                <ImageWrapper src={img} alt={title}></ImageWrapper>
                <ColumnWrapper>
                    <Title>{title}</Title>
                    <span>{description}</span>
                </ColumnWrapper>
            </div>
            <RightWrapper>
                <Title>{`${price.toLocaleString()}원`}</Title>
                <Button onClick={removeCartItem}>삭제</Button>
            </RightWrapper>
        </Wrapper>
    );
}

const Wrapper = styled.li`
    width: 100%;
    padding: 16px;
    border: 1px solid var(--line-gray);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const ImageWrapper = styled.img`
    height: 60px;
    width: 60px;
    float: left;
    margin-right: 16px;
    border: 1px solid var(--line-gray);
    border-radius: 8px;
`;
const ColumnWrapper = styled.div`
    display: flex;
    height: 60px;
    flex-direction: column;
    justify-content: center;
`;
const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    > span {
        text-align: right;
    }
`;
const Title = styled.span`
    font-weight: var(--bold);
    font-size: 18px;
`;
const Button = styled.button`
    display: block;
    padding: 4px 8px;
    width: fit-content;
`;
