import React from 'react';
import './sort.css';

const Sort = (props)=>{
    const {
        sort,
        sortQuery,
        sortingParameter,
        langInterface
    } = props;

    return (
        <div className="sort">

            <span>{langInterface==='ru'?'Сортировка': 'Sort'}</span>

            <ul>
                <li
                    className={sortQuery ==='id' ? 'active': ''}
                    onClick={()=>sort('id', sortingParameter)}>
                    ID
                </li>

                <li
                    className={sortQuery ==='name' ? 'active': ''}
                    onClick={()=>sort('name', sortingParameter )}>
                    {langInterface==='ru'?'Имя':"Name"}
                </li>

                <li
                    className={sortQuery ==='age' ? 'active': ''}
                    onClick={()=>sort('age', sortingParameter)}>
                    {langInterface==='ru'?'Возраcт':"Age"}
                </li>
            </ul>

            <ul className="sorting-parameter">
                <li
                    className={sortingParameter ==='increase' ? 'active': ''}
                    onClick={()=> sort(sortQuery, 'increase')}
                >
                    {'По возрастанию'}
                </li>

                <li
                    className={sortingParameter ==='decrease' ? 'active': ''}
                    onClick={()=>sort(sortQuery, 'decrease')}
                >
                    {'По убыванию'}
               </li>
            </ul>
        </div>
    )
};

export default Sort;