import './App.css';
import { Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Homepage}/>
      <Route exact path='/chats' component={ChatPage}/>
    </div>
  );
}

export default App;
