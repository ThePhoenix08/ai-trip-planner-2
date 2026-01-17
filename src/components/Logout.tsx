import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const Logout = ({ classes, children }: { classes?: string; children: React.ReactNode }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button className={classes} onClick={handleLogout}>
      {children}
    </button>
  );
};

export default Logout;
