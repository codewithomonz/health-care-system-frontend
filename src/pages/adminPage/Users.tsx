import { useGetUsersQuery, type User } from "@/features/users/userApiSlice";

const UsersPage = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Failed to load users.</p>;

  if (users) {
    console.log(users);
  }

  return (
    <div className="p-4">
      <h4 className="text-xl font-semibold mb-4">Users List</h4>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Hospital-ID</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Created</th>
          </tr>
        </thead>
        <tbody>
          {users!.data?.map((user: User) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.hostpitalId}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
