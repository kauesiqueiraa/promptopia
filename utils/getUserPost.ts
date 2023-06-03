const getUserPosts = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}/posts`)
  return response.json()
}

export default getUserPosts
