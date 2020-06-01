import React from 'react';
import './user-view-table.css';

const UserViewTable = (props)=>{
    const {
        index,
        userImage,
        userName,
        userAge,
        userPhone
    } = props;

    const style = {
        animation: `fadein ${index}s`
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

        </div>
    )
};

export default UserViewTable;