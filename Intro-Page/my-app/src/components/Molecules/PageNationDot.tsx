import React from 'react';
import styled, { keyframes, css, StyledComponent } from 'styled-components';

interface PageNationDotProps {
    scrollPageIndex: number;
    num?: number;
}

export default function PageNationDot({ scrollPageIndex }: PageNationDotProps) {
    return (
        <PageNationContainer>
            <DotContainer>
                <Dot num={1} scrollPageIndex={scrollPageIndex}></Dot>
                <Dot num={2} scrollPageIndex={scrollPageIndex}></Dot>
                <Dot num={3} scrollPageIndex={scrollPageIndex}></Dot>
                <Dot num={4} scrollPageIndex={scrollPageIndex}></Dot>
            </DotContainer>
        </PageNationContainer>
    );
}

const Dot = ({ num, scrollPageIndex }: PageNationDotProps) => {
    console.log('DotIndex', scrollPageIndex);
    return <DotStyle scrollPageIndex={scrollPageIndex} num={num}></DotStyle>;
};

const DotStyle: StyledComponent<
    'div',
    any,
    PageNationDotProps
> = styled.div<PageNationDotProps>`
    width: 10px;
    height: 10px;
    border: 1px solid black;
    border-radius: 50%;
    background-color: ${({ scrollPageIndex, num }) =>
        scrollPageIndex === num ? 'black' : 'transparent'};
`;

const PageNationContainer = styled.div`
    position: fixed;
    top: 50%;
    right: 100px;
`;

const DotContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    width: 20px;
    height: 100px;
`;
