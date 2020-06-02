import React from 'react';
import './user-view-table.css';

const UserViewTable = (props)=>{
    const {
        id,
        index,
        userImage,
        userName,
        userAge,
        userPhone,
        addFavorites,
        favorites
    } = props;

    const style = {
        animationDelay: `${index/4}s`,
        animationName: `fadein`,
        animationDuration: `1s`,
        animationIterationCount: 1,
        animationFillMode: `forwards`,
    };

    return (
        <div
            className="user-view-table"
            style={style}
        >
            <div className="name-age-wrapper">
                <img src={require(`../../materials/images/${userImage}.svg`)} alt=""/>

                <span className="name">
                      {
                          userName
                      }

                  </span>

                <span className="age">
                      {
                          userAge
                      }
                  </span>
            </div>


            <div className="phone-favorites-wrapper">
                <span className="phone">
                      {
                          userPhone
                      }
            </span>

                <span className="favorites">
                <i
                    className={`${favorites.includes(id)? 'star-active': 'star'}`}
                    onClick={()=>addFavorites(id)}
                />
            </span>

            </div>


        </div>
    )
};

export default UserViewTable;