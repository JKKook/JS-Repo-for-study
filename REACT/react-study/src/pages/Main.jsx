import React from 'react';
import styled from 'styled-components';
import ProductCard from '../components/Molecules/ProductCard';
import dummyData from '../model/dummyData';

export default function Main() {
    return (
        <ListWrapper>
            {dummyData.map((data) => {
                return (
                    <li key={data.id}>
                        <ProductCard data={data} />
                    </li>
                );
            })}
        </ListWrapper>
    );
}

const ListWrapper = styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
    gap: 8px;
`;
