import './App.css';
import { Chat } from './chat/Chat';
import { Dashboard } from './dashboard/Dashboard';

export function App() {
  return (
    <>
      <div className="container">
        <Chat />
        <Dashboard />
      </div>
    </>
  );
}
