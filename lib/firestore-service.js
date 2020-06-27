import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import config from '../config'

try {
  firebase.initializeApp(config)
} catch (error) {
  if (!/already exists/.test(error.message)) {
    console.error(error.stack)
  }
}

const db = firebase.firestore()

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously()
}

export const addVote = (vote, iceCreamId) => {
  return db.collection('icecreams')
    .doc(iceCreamId)
    .collection('votes')
    .add(vote)
}

export const getVotes = iceCreamId => {
  return db.collection('icecreams')
    .doc(iceCreamId)
    .collection('votes')
    .get()
}

export const streamVotes = (iceCreamId, observer) => {
  return db.collection('icecreams')
    .doc(iceCreamId)
    .collection('votes')
    .onSnapshot(observer)
}
