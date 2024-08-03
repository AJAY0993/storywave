function Avatar({ profilePic }: { profilePic: string }) {
  return (
    <img
      className="w-8 h-8 aspect-square rounded-full"
      src={profilePic}
      alt="icon"
    />
  )
}

export default Avatar
