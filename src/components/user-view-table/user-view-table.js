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
        animation: `fadein ${index/5}s`
    };

    return (
        <div className="user-view-table" style={style}>
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
    )
};

export default UserViewTable;