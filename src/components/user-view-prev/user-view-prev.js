import React from 'react';
import './user-view-prev.css';

const UserViewPrev = (props) => {
    const {
        userImage,
        userName,
        userAge,
        userPhone,
        userPhrase,
        userVideo
    } = props;

    const width100 = userVideo ? 'width100' : '';

    return (
            <div className={`user-view-prev ${width100}`}>

                <div className="user-info">
                    <div className="avatar-name">
                        <img src={require(`../../materials/images/${userImage}.svg`)} alt=""/>

                        <span className="name">
                    {userName}
                    </span>
                    </div>

                    <span className="age">
                    {userAge}
                </span>

                    <span className="phone">
                    {userPhone}
                </span>

                    <p className="phrase">
                        {userPhrase}
                    </p>
                </div>

                <div className="video">
                    {
                        userVideo &&
                        <video width="300" height="100%" controls="controls" autoPlay={'autoPlay'}
                        >
                            <source src={require(`../../materials/videos/${userVideo}.mp4`)}/>
                        </video>
                    }
                </div>

            </div>
    )
};

export default UserViewPrev;