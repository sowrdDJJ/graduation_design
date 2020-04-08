const getters = {
  currUserData: state => state.user.currUserData,
  currFriendId: state => state.friend.currFriendId,
  currOrderList: state => state.user.currOrderList,
  token: state => state.user.token,
  roles: state => state.user.roles
}

export default getters
