import { useAuth } from '../../state/auth/authReducer';

import './Dashboard.css';

export function Dashboard() {
  const auth = useAuth();

  return (
    <div className='dashboard-container'>
      <h2>Welcome back, {auth.user?.firstName}!</h2>
      <p>Here's your dashboard.</p>
    </div>
  );
}
