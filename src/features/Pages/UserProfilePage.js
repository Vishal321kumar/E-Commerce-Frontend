import Navbar from '../Navbar/Navbar';
import UserProfile from '../user/components/UserProfile';


function UserProfilePage() {
  return (
    <div>
      <Navbar>
        <h1 className='mx-auto text-2xl'>My Profile</h1>
        <UserProfile></UserProfile>
      </Navbar>
    </div>
  );
}

export default UserProfilePage;