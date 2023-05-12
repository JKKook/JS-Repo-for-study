import React from 'react';
import ProfileImage from '../Atoms/ProfileImage';

export default function Profile({ image, name, title, newOne }) {
    return (
        <div className='container'>
            <ProfileImage image={image} />
            <p>{name}</p>
            <p>{title}</p>
            {newOne === true ? <p className='new'>내가뉴비다</p> : ''}
        </div>
    );
}
