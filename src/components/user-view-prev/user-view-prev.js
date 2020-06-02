import React, {useState, useEffect, useRef } from 'react';
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

    const [autoPlay, setAutoPlay] = useState(false);
    const [y, setY] = useState(600);
    const [color, setColor] = useState('');
    const width100 = userVideo ? 'width100' : '';
    const userViewTableRef = useRef();

    const listenScrollEvent = event => {
        console.log(window.scrollY + 600, userViewTableRef.current.offsetTop , userViewTableRef.current)
        if ( y > userViewTableRef.current.offsetTop) {

            setY(window.scrollY+y);
            setAutoPlay(true);
            setColor('test');
        }

    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);

        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);


    return (
            <div className={`user-view-prev ${width100}`}
                 ref={userViewTableRef}
            >

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


                {
                    userVideo &&
                <div className={`video ${color}`} >

                        <video width="1" height="auto" controls="controls" autoPlay={autoPlay}
                        >
                            <source src={require(`../../materials/videos/${userVideo}.mp4`)}/>
                        </video>

                </div>
                }
            </div>
    )
};

export default UserViewPrev;