import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
        users: null,
        langQuery: 'ru'
    };
  }

  async componentDidMount(){
    const promise = await fetch('http://drew11.github.io/redlab-test/data/data.json');
    const data = await promise.json();
    this.setState({users: data});
  }

  render(){

      const users = this.state.users ? this.state.users.map(user=>{
          return (
              <li key={user.id}>
                  {
                      user.name[this.state.langQuery]
                  }
              </li>
          )

      }): null;

      return (
          <div className="App">
            <header>
              <h1>Hello</h1>
            </header>
            <main>
                <ul>
                    { users }
                </ul>
            </main>
          </div>
      );
  }

}

export default App;
