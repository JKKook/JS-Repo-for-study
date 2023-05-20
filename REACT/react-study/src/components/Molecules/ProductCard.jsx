import React from 'react';
import styled from 'styled-components';

export default function ProductCard({ data }) {
    // props 재정의, dummyData 구조분해할당
    const { id, title, description, price, img } = data;
    return (
        <Wrapper>
            <img
                src={img}
                alt={`${id}의 더비 이미지`}
                width={276}
                height={276}
            />
            <Price>{price}</Price>
            <Haeding>{title}</Haeding>
            <MaxLine1>{description}</MaxLine1>
            <Button></Button>
        </Wrapper>
    );
}

const Price = styled.span`
    font-size: 20px;
    color: var(--font-black);
    font-weight: var(--bold);
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
