import useUserStore from "../Store/userStore";

const Profile = () => {
  const user = useUserStore();

  if (!user?.emailAddress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">You need to log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Profile Page</h1>
      <div className="space-y-2">
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.emailAddress}</p>
        <p><strong>Joined:</strong> {new Date(user.dateJoined || "").toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Profile;
