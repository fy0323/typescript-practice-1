interface UserInfo {
  name: string;
  bio: string;
}

function Profile({ name, bio }: UserInfo){
  return (
    <div>
      <h1>私の名前は{name}です</h1>
      <p>{bio}</p>
    </div>
  )
}

export default Profile