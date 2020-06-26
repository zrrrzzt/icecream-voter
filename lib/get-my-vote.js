export default (user, votes) => {
  return votes
    .map(vote => vote.data())
    .find(vote => vote.user === user)
}
