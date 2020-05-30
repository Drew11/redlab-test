import React from 'react';
import UserViewTable from '../user-view-table/user-view-table';
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
        filterQuery: ''
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

  switchInterfaceLang = (event)=>{
      this.setState({langInterface: event.target.value})
  };

  async componentDidMount(){
    const promise = await fetch('http://drew11.github.io/redlab-test/materials/data/data.json', {
        mode: 'cors'
    });
    const data = await promise.json();

    this.setState({users: data},
        ()=>this.sort(this.state.sortQuery, this.state.sortingParameter)
    );
  }

  render(){

      console.log(this.state.users)
      const users = this.state.users ? this.getFilteredUsers().map(user=>{
          return (
              <UserViewTable key={user.id}
                             userImage={user.image}
                             userName={user.name[this.state.langInterface]}
                             userAge={user.age}
                             userPhone={user.phone}
              />
          )

      }): null;

      const search = this.state.langInterface === 'ru' ?'Поиск':'Search';

      return (
          <div className="App">
            <header>
              <h1>Test task</h1>

                <select name="lang" id=""
                        onChange={this.switchInterfaceLang}
                        value={this.state.langInterface}
                >
                    <option value="ru"  >Ru</option>
                    <option value="en" >En</option>
                </select>


                <div className="search">
                    <span>
                        {search}
                    </span>

                    <input
                        onChange={this.setFilterQuery}
                        type="text"
                    />
                </div>

                <div className="sort-view-wrapper">
                    <Sort
                        sort={this.sort}
                        sortQuery={this.state.sortQuery}
                        sortingParameter={this.state.sortingParameter}
                        langInterface={this.state.langInterface}
                    />

                    <ul className="app-view">
                        <li>{'Таблица'}</li>
                        <li>{'Превью'}</li>
                    </ul>

                </div>

            </header>

            <main>

                { users }
            </main>

              <footer>

              </footer>
          </div>
      );
  }

}

export default App;
