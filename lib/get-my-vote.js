export default (user, votes) => {
  return votes
    .find(vote => vote.user === user)
}
