import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

export default function MainIntroduceText() {
    // intersectionObserver
    // DOM 요소노드(elementNode)에 직접 접근하기 이해 useRef를 사용, 사용하고자 하는 DOM에 ref={참고할 변수}
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // interface으로 만들어서 적용해도 됨
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        // intersectionObserverEntry 내장 모듈 사용
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                console.log('entry감지', entry);
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    console.log('intersect :', entry.isIntersecting); // 콘텐츠가 화면에 보일 땐 true값 형성
                    console.log('Ratio :', entry.intersectionRatio); // 콘텐츠가 스크린에 몇 퍼센트 등장했는지 확인 가능
                    entry.target.classList.add('fade-in');
                } else {
                    entry.target.classList.remove('fade-in');
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        if (textRef.current) {
            console.log('textRef 현재값', textRef.current);
            observer.observe(textRef.current);
        }

        return () => {
            if (textRef.current) {
                console.log('textRef 현재값', textRef.current);
                observer.unobserve(textRef.current);
            }
        };
    }, []);

    return (
        <TextContainer ref={textRef}>
            <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Debitis, quos et laboriosam omnis, eum voluptates assumenda
                voluptate repellendus ipsam, rem officia dolorem aspernatur ad?
                Minus quibusdam iusto tempore sequi illum.
            </Text>
        </TextContainer>
    );
}

// fadeIn Animation

const TextAnimation = keyframes`
    from {
        opacity : 0;
    }
    to {
        opacity : 1;
    }
`;

const TextContainer = styled.div`
    margin-left: 5rem;
    margin-bottom: 2rem;
    max-width: 600px;
    white-space: pre-line;
    word-break: break-word;

    &.fade-in {
        opacity: 1;
        animation: ${TextAnimation} 2s linear;
    }
`;

const Text = styled.span`
    font-size: 24px;
    font-weight: bold;
    color: #333;
`;
