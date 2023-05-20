import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { CartItemAtom } from '../../recoil/cart-item';

export default function ProductCard({ data }) {
    // props 재정의, dummyData 구조분해할당
    const { id, title, description, price, img } = data;
    console.log('propsData', data);

    // recoil Atom 호출
    const [cartItem, setCartItem] = useRecoilState(CartItemAtom);

    // 카트에 동일한 아이템이 들어가지 않도록
    // 동일한 아이템 filtering
    const isAlreadyInCart = cartItem.filter((item) => item.id === id).length;

    // 버튼 클릭을 통해 상품을 추가하는 로직을 만들어보자
    const handleItemIntoCart = () => {
        // ** 동일한 아이템 안 들어오게 로직 추가
        if (!isAlreadyInCart) {
            // 이 로직을 틀리면 야근이아니라 회사를 못 다닐 수도 있다!
            // 원본 배열이 상하지 않는지!! 반드시 확인하자
            setCartItem((prevItem) => [...prevItem, data]);
        }
    };

    return (
        <Wrapper>
            <img
                src={img}
                alt={`${id}의 더비 이미지`}
                width={276}
                height={276}
            />
            <Haeding>{title}</Haeding>
            <MaxLine1>{description}</MaxLine1>
            <Price>{`${price.toLocaleString()}원`}</Price>
            <Button onClick={handleItemIntoCart} disabled={isAlreadyInCart}>
                {isAlreadyInCart
                    ? '이미 추가된 상품입니다'
                    : '장바구니에 추가합니다'}
            </Button>
        </Wrapper>
    );
}

const Price = styled.span`
    margin-top: 1rem;
    font-size: 20px;
    color: var(--font-pink);
    font-weight: var(--bold);
    text-align: center;
`;
const Wrapper = styled.div`
    padding: 16px;
    width: 310px;
    height: 100%;
    border: 1px solid var(--line-gray);
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;
const MaxLine1 = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const Button = styled.button`
    margin-top: 1rem;
    padding: 8px;
    color: #fff;
    background-color: var(--main);
    &:disabled {
        background-color: var(--line-gray);
        color: var(--font-gray);
    }
`;
export const Haeding = styled.span`
    font-size: 18px;
    font-weight: var(--bold);
`;
