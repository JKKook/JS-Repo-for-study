import React from 'react';
import styled from 'styled-components';
interface AnimatedContentProps {
    image: string;
    handleAnimation?: (action: 'open' | 'close') => void;
}
export default function Banner({
    handleAnimation,
    image,
}: AnimatedContentProps) {
    // handleClick 재정의, imageId에 해당되는 것만 애니메이션 발생
    const handleClick = () => {
        if (handleAnimation) {
            handleAnimation('open');
        }
    };
    return <BannerImage onClick={handleClick} src={image} alt='bannerImage' />;
}

const BannerImage = styled.img`
    cursor: pointer;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 2rem 3rem;
`;
