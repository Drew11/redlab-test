import React from 'react';
import UserViewTable from '../user-view-table/user-view-table';
import UserViewPrev from '../user-view-prev/user-view-prev';
import Sort from '../sort/sort';

import './app.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
        appView: 'table',
        users: null,
        langInterface: 'ru',
        sortQuery: 'id',
        sortingParameter: 'increase',
        filterQuery: '',
        favorites: []
    };
  }

  sort = (sortingQuery, sortingParameter)=>{


      if(sortingQuery === this.state.sortQuery && sortingParameter === this.state.sortingParameter) {
          return;
      }

      const copy = [...this.state.users];

      this.setState({
              ...this.state,
          sortQuery: sortingQuery,
          sortingParameter: sortingParameter
          },
          ()=>{
          let callbackMap;
          if (sortingParameter==='increase'){
              callbackMap = {
                  'id':(a,b) => a[sortingQuery] - b[sortingQuery],
                  'name':(a, b)=> a.name[this.state.langInterface].localeCompare(b.name[this.state.langInterface]),
                  'age':(a, b)=> a[sortingQuery] - b[sortingQuery]
              };
          }
          if (sortingParameter==='decrease'){
              callbackMap = {
                  'id':(a,b) => b[sortingQuery] - a[sortingQuery],
                  'name':(a, b)=> b.name[this.state.langInterface].localeCompare(a.name[this.state.langInterface]),
                  'age':(a, b)=> b[sortingQuery] - a[sortingQuery]
              };
          }

          copy.sort(callbackMap[sortingQuery]);
          this.setState({users: copy})
      });

  };

  setFilterQuery =(event)=>{
      this.setState({filterQuery: event.target.value})
  };

  getFilteredUsers =()=>{
        return this.state.users.filter(user=>{
          const fullName = user.name[this.state.langInterface].toLocaleLowerCase();
          const reqQuery = this.state.filterQuery.toLocaleLowerCase();
          const reverseFullName = fullName.split(' ').reverse().join(' ');

          if(fullName.includes(reqQuery) || reverseFullName.includes(reqQuery)){
              return user;
          }
        })
  };

  switchInterfaceLang = (event) => {
      this.setState({langInterface: event.target.value})
  };

  setAppView = (appView) => {
      this.setState({appView})
  };

  addFavorites = (id) => {
    let favorites;

    if(!this.state.favorites.includes(id)){
        favorites = [...this.state.favorites];
        favorites.push(id);
    } else {
        favorites = this.state.favorites.filter(userId=>userId!==id);
    }

    this.setState({ favorites })
  };

  componentDidUpdate(prevProps, prevState){
      if(prevState!==this.state) {
          const copy = {...this.state};
          copy.users = null;
          window.localStorage.setItem('state', JSON.stringify(copy));
      }
  }

  async componentDidMount(){

    const promise = await fetch('https://drew11.github.io/redlab-test/materials/data/data.json', {
        mode: 'cors'
    });
    const data = await promise.json();
    const localeStorageState = JSON.parse(window.localStorage.getItem('state'));

    this.setState({...localeStorageState,
            users: data
        },
        ()=>this.sort(this.state.sortQuery, this.state.sortingParameter)
    );
  }


  render(){

      const users = this.state.users ? this.getFilteredUsers().map((user, index)=>{
        let component;

        if(this.state.appView === 'table'){
             component = <UserViewTable
                   key={user.id}
                   id={user.id}
                   index={index}
                   userImage={user.image}
                   userName={user.name[this.state.langInterface]}
                   userAge={user.age}
                   userPhone={user.phone}
                   addFavorites={this.addFavorites}
                   favorites={this.state.favorites}
             />
        }

        if (this.state.appView === 'prev'){

            component = <UserViewPrev
                            key={user.id}
                            userImage={user.image}
                            userName={user.name[this.state.langInterface]}
                            userAge={user.age}
                            userPhone={user.phone}
                            userPhrase={user.phrase[this.state.langInterface]}
                            userVideo={Object.getOwnPropertyNames(user).includes('video')? user.video : null}
                         />

        }

          return component;

      }): null;

      const search = this.state.langInterface === 'ru' ?'Поиск':'Search';
      const tableStyle = this.state.appView === 'table'? 'direction-column': '';

      return (
          <div className="App">
            <header>
              <h1>Test task</h1>

                <div className="lang-search-wrapper">

                    <div className="search">

                        <span>
                            {search}
                        </span>

                        <input
                            onChange={this.setFilterQuery}
                            type="text"
                            value={this.state.filterQuery}
                        />

                    </div>

                    <div className="lang-select">
                        <select name="lang" id=""
                                onChange={this.switchInterfaceLang}
                                value={this.state.langInterface}
                        >
                            <option value="ru" >Ru</option>
                            <option value="en" >En</option>
                        </select>
                    </div>


                </div>


                <div className="sort-view-wrapper">
                    <Sort
                        sort={this.sort}
                        sortQuery={this.state.sortQuery}
                        sortingParameter={this.state.sortingParameter}
                        langInterface={this.state.langInterface}
                    />

                    <ul className="app-view">
                        <li
                            className={this.state.appView === 'table'? 'active': ''}
                            onClick={()=>this.setAppView('table')}
                        >
                            { this.state.langInterface==='ru'?'Таблица': '' }
                            { this.state.langInterface==='en'?'Table': '' }

                        </li>

                        <li
                            className={this.state.appView === 'prev'? 'active': ''}
                            onClick={()=>this.setAppView('prev')}
                        >
                            { this.state.langInterface === 'ru'? 'Превью': '' }
                            { this.state.langInterface === 'en' ?'Preview': '' }
                        </li>
                    </ul>

                </div>

            </header>

            <main>
                <div className={`main-view-container ${tableStyle}`}>

                    { users }

                </div>
            </main>

              <footer>

              </footer>
          </div>
      );
  }
}

export default App;
