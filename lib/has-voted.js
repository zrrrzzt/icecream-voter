export default (user, votes) => {
  const voters = votes
    .map(vote => vote.data())
    .map(vote => vote.user)
  return voters.includes(user)
}
