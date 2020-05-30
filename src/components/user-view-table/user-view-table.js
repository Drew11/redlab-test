import React from 'react';
import './user-view-table.css';

const UserViewTable = (props)=>{
    const {
        userImage,
        userName,
        userAge,
        userPhone
    } = props;

    return (
        <div className="user-view-table">
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