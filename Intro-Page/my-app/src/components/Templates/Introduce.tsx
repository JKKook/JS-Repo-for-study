import React from 'react';
import Profile from '../Organisms/Profile';
import Section from '../Organisms/Section';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import { useEffect } from 'react';

const DIVIDER_HEIGHT = 5;

export default function Introduce() {
    // 스크롤 시 section 영역마다 이동 제어하기 위해
    // outerDiv DOM에 접근
    const outerDivRef = useRef<HTMLDivElement>(null);

    // 스크롤 페이지 state에 할당
    const [scrollPageIndex, setScrollPageIndex] = useState<number>(0);

    useEffect(() => {
        const wheelHandler = (e: WheelEvent) => {
            e.preventDefault();
            // scroll action
            const { deltaY } = e;
            // TypeError : HTMLDiv 노드의 Null값을 체크해줘야 함 (Type-Assertion)
            const { scrollTop } = outerDivRef.current as HTMLDivElement;
            const pageHeight = window.innerHeight;

            if (deltaY > 0) {
                console.log('deltaY', deltaY);
                // scroll down
                if (scrollTop >= 0 && scrollTop < pageHeight) {
                    console.log('scrollTop :', scrollTop);
                    console.log('ScrollDown : page 1');
                    outerDivRef.current?.scrollTo({
                        top: pageHeight + DIVIDER_HEIGHT,
                        left: 0,
                        behavior: 'smooth',
                    });
                    setScrollPageIndex(2);
                } else if (
                    scrollTop >= pageHeight &&
                    scrollTop < pageHeight * 2
                ) {
                    // page 2
                    console.log('ScrollDown : page 2');
                    outerDivRef.current?.scrollTo({
                        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
                        left: 0,
                        behavior: 'smooth',
                    });
                    setScrollPageIndex(3);
                } else if (
                    scrollTop >= pageHeight &&
                    scrollTop < pageHeight * 2
                ) {
                    // page 2
                    console.log('ScrollDown : page 2');
                    outerDivRef.current?.scrollTo({
                        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
                        left: 0,
                        behavior: 'smooth',
                    });
                    setScrollPageIndex(3);
                } else {
                    // page 3
                    outerDivRef.current?.scrollTo({
                        top: pageHeight * 4,
                        left: 0,
                        behavior: 'smooth',
                    });
                    setScrollPageIndex(3);
                }
            } else {
                // scroll up
                if (scrollTop >= 0 && scrollTop < pageHeight) {
                    console.log('ScrollUp : page 1');

                    outerDivRefCurrent?.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth',
                    });
                    setScrollPageIndex(1);
                } else if (
                    scrollTop >= pageHeight &&
                    scrollTop < pageHeight * 2
                ) {
                    console.log('ScrollUp : page 2');
                    outerDivRefCurrent?.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth',
                    });
                    setScrollPageIndex(1);
                } else {
                    // page 3
                    outerDivRef.current?.scrollTo({
                        top: pageHeight + DIVIDER_HEIGHT,
                        left: 0,
                        behavior: 'smooth',
                    });
                    setScrollPageIndex(2);
                }
            }
        };

        const outerDivRefCurrent = outerDivRef.current;
        outerDivRefCurrent?.addEventListener('wheel', wheelHandler);
        return () => {
            outerDivRefCurrent?.removeEventListener('wheel', wheelHandler);
        };
    }, []);

    return (
        <OuterDiv ref={outerDivRef}>
            <Profile />
            <Section />
            <Divider></Divider>
            <Section />
            <Divider></Divider>
            <Section />
        </OuterDiv>
    );
}

const OuterDiv = styled.div`
    height: 100vh;
    overflow-y: auto;

    // 화면에서 스크롤바 안보이게
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Divider = styled.div`
    width: 100%;
    height: 5px;
    background-color: gray;
`;
