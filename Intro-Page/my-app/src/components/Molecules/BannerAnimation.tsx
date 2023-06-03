import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Banner from '../Atoms/Banner';

// Animation Type을 지정해줘야 함, AnimationContentProps가 제네릭이기 때문
// tsx 코드 안으로 넣어도 됨.
interface AnimatedContentProps {
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
                    <Banner handleAnimation={handleAnimation} />
                </AnimatedContent>
            </AnimationContainer>
        </>
    );
}

// animation

const AnimationContainer = styled.div``;

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
