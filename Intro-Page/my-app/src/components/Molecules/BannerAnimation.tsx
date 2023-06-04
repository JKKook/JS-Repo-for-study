import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Banner from '../Atoms/Banner';

interface AnimatedContentProps {
    image?: string;
    isAnimation?: boolean;
    handleAnimation?: (action: 'open' | 'close') => void;
}
export default function BannerAnimation({
    isAnimation,
    handleAnimation,
}: AnimatedContentProps) {
    return (
        <>
            <AnimationContainer>
                <AnimatedContent isAnimation={isAnimation}>
                    <Banner
                        handleAnimation={handleAnimation}
                        image='https://cdn.pixabay.com/photo/2016/08/23/15/01/board-1614646_1280.jpg'
                    />
                    <Banner
                        handleAnimation={handleAnimation}
                        image='https://cdn.pixabay.com/photo/2017/01/10/01/32/teach-1968076_1280.jpg'
                    />
                    <Banner
                        handleAnimation={handleAnimation}
                        image='https://cdn.pixabay.com/photo/2016/07/28/04/31/math-1547018_1280.jpg'
                    />
                </AnimatedContent>
            </AnimationContainer>
        </>
    );
}

// animation

const AnimationContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

// 슬라이드버튼 다운
const slideDownAnimation = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(30vh);
    opacity: 0;
  }
`;

const AnimatedContent = styled.div<AnimatedContentProps>`
    position: relative;
    margin-top: 3rem;

    ${({ isAnimation }) =>
        isAnimation &&
        css`
            animation: ${slideDownAnimation} 0.5s forwards;
            pointer-events: none;
        `}
`;
