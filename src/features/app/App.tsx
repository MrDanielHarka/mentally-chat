import { Chat } from '../chat/Chat';
import { Dashboard } from '../dashboard/Dashboard';
import './App.css';

export function App() {
  return (
    <>
      <div className="container">
        <Chat />
        {/* <Dashboard /> */}
      </div>
    </>
  );
}
