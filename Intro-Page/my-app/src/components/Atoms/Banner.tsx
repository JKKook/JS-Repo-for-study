import React from 'react';
import styled from 'styled-components';
interface AnimatedContentProps {
    handleAnimation?: (action: 'open' | 'close') => void;
}
export default function Banner({ handleAnimation }: AnimatedContentProps) {
    // handleClick 재정의,
    const handleClick = () => {
        if (handleAnimation) {
            handleAnimation('open');
        }
    };
    return (
        <>
            <BannerImage
                onClick={handleClick}
                src='https://cdn.pixabay.com/photo/2014/10/31/17/41/dancing-dave-minion-510835_1280.jpg'
                alt='banner1'
            />
        </>
    );
}

const BannerImage = styled.img`
    cursor: pointer;
    width: 500px;
`;
