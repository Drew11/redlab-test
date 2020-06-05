import React, {useState, useEffect, useRef } from 'react';
import './user-view-prev.css';

const getWindowDimensions =()=> {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
};

console.log(getWindowDimensions())
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
    const [y, setY] = useState(getWindowDimensions().height/2);
    const [color, setColor] = useState('');
    const width100 = userVideo ? 'width100' : '';
    const phraseStyle = userVideo? 'phrase-video':'phrase';
    const userInfoStyle = userVideo? 'user-info-video': 'user-info';
    const userViewTableRef = useRef();


    const listenScrollEvent = event => {
        const newCoord = window.scrollY + y;
        setY(newCoord);
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);

    useEffect(() => {
        if ( y > userViewTableRef.current.offsetTop) {
            setAutoPlay(true);
            setColor('test');
        }
    }, [y]);



    return (
            <div className={`user-view-prev ${width100}`}
                 ref={userViewTableRef}
            >
                <div className={userInfoStyle}
                >
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

                    <p className={phraseStyle}
                    >
                        {userPhrase}
                    </p>
                </div>

                {
                    userVideo &&
                    <div className={`video ${color}`} >
                        <video controls="controls" autoPlay={autoPlay}
                        >
                            <source src={require(`../../materials/videos/${userVideo}.mp4`)}/>
                        </video>
                    </div>
                }
            </div>
    )
};

export default UserViewPrev;