import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MainIntroduceText from '../Atoms/MainIntroduceText';
import BannerAnimation from '../Molecules/BannerAnimation';

// 직접 만들어본 interface 내장 매서드 사용해도 됨
// entry관련 코드는 따로 뺴주고, entries에 할당해주자
interface IntersectionObserverEntry {
    readonly target: Element;
    readonly isIntersecting: boolean;
    readonly intersectionRatio: number;
}

// 리액트 props에 할당할 것
interface useIntersectionObserverProps {
    root?: null;
    rootMargin?: string;
    fadeThreshold?: number;
    onIntersect: (entries: IntersectionObserverEntry[]) => void;
}

export default function Profile() {
    const [isAnimation, setIsAnimation] = useState<boolean>(false);

    // IntersectionObserverEntry 인터페이스 적용, 직접 구상하고 싶으면 따로 interface처리하면 됨

    // const handleIntersection = (entries : IntersectionObserverEntry) => {
    //     entries.forEach((entry) => {
    //         console.log('entry감지', entry);
    //         if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
    //             console.log('intersect :', entry.isIntersecting); // 콘텐츠가 화면에 보일 땐 true값 형성
    //             console.log('Ratio :', entry.intersectionRatio); // 콘텐츠가 스크린에 몇 퍼센트 등장했는지 확인 가능
    //             entry.target.classList.add('fade-in');
    //         } else {
    //             entry.target.classList.remove('fade-in');
    //         }
    //     });
    // };

    const handleAnimation = (action: 'open' | 'close') => {
        if (action === 'open') {
            setIsAnimation(true);
        } else if (action === 'close') {
            setIsAnimation(false);
        }
    };

    return (
        <ProfileContainer>
            <Title>IntroDuce</Title>
            <AvatarContainer>
                <Avatar
                    src='https://cdn.pixabay.com/photo/2016/03/27/17/42/man-1283235_1280.jpg'
                    alt='teacher_avatar'
                />

                <MainIntroduceText />
            </AvatarContainer>
            <MainIntroduceText />

            {/* animation banner */}
            {/* 클릭 시 콘텐츠가 다른 요소를 밀어내도록 */}

            <BannerAnimation
                isAnimation={isAnimation}
                handleAnimation={(action) => handleAnimation(action)}
            />

            {/* modal Animation */}
            {isAnimation && (
                <Modal>
                    <ModalContent>
                        <Content>모달창</Content>
                        <p>서브 콘텐츠 </p>
                        <Avatar
                            src='https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_1280.jpg'
                            alt='items'
                        />
                        <ModalCloseButton
                            onClick={() => handleAnimation('close')}
                        >
                            &times;
                        </ModalCloseButton>
                    </ModalContent>
                </Modal>
            )}
        </ProfileContainer>
    );
}

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Title = styled.span`
    margin-left: 5rem;
    margin-top: 5rem;
    font-size: 36px;
`;

const AvatarContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const Avatar = styled.img`
    margin: 5rem;
    width: 300px;
    height: 300px;
    border-radius: 50%;
`;

// modal
const Content = styled.span`
    margin-top: 1rem;
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const ModalContent = styled.div`
    position: relative;
    background-color: white;
    padding: 2rem;
    border-radius: 4px;
`;

const ModalCloseButton = styled.button`
    background-color: transparent;
    border: none;
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
`;
