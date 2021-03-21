// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

async function loadGreeting() {
   const response =  await fetch('http://localhost:9000/graphql', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({query:'{test}'})
   })
   const rsponseBody =  await response.json();
   return rsponseBody.data.test;
   // eslint-disable-next-line no-unreachable
   console.log("end of function")
}

async function  loadSayhello(name) {
   const response =  await fetch('http://localhost:9000/graphql', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({query:`{sayHello(name:"${name}")}`})
   })
   const rsponseBody =  await response.json();
   return rsponseBody.data.sayHello;
}

function App() {

  const [greetingMessage, setGreetingMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [sayHelloMessage, setSayHelloMessage] = useState("");

  function showGreeting() {
    loadGreeting().then((g) =>
      setGreetingMessage(g + ' :-)')
    );
  }

  function showSayHelloMessage() {
    const name = userName;
    console.log(name)
    loadSayhello(name).then((m) => setSayHelloMessage(m));
  }

  function updateName(event) {
    setUserName(event.target.value);
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}

      <br />
      <br />
      <section>
        <button id="btnGreet" onClick={showGreeting}>
          Greet
        </button>
        <br /> <br />
        <div id="greetingDiv">
          <h1>{greetingMessage}</h1>
        </div>
      </section>

      <hr />

      <section>
        Enter a name:
        <input
          id="txtName"
          type="text"
          onChange={updateName}
          value={userName}
        />
        <button id="btnSayhello" onClick={showSayHelloMessage}>
          SayHello
        </button>
        <br />
        user name is:{userName} <br />
        <div id="SayhelloDiv">
          <h1>{sayHelloMessage}</h1>
        </div>
      </section>
    </div>
  );
}

export default App;
