import User from 'components/User'

export default function Users({ users }) {
  if (!users) return null

  return (
    <>
      {users.map((user, index) => (
        <User key={index} user={user} />
      ))}
    </>
  )
}