import {db} from '../firebase'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc
} from 'firebase/firestore';

const CollectionplayerRef = collection(db,'player');
const CollectioneventRef = collection(db,'event');
const CollectionmeetingtRef = collection(db,'meeting');

class PlayerDataService {
    addPlayer = (newPlayer) => {
        return addDoc(CollectionplayerRef,newPlayer)
    };
    addEvent = (newEvent) => {
        return addDoc(CollectionplayerRef,newEvent)
    };
    addMeeting = (newMeeting) => {
        return addDoc(CollectionmeetingtRef,newMeeting)
    }

    updatePlayer = (updatedPlayer,id) =>{
        const playerDoc = doc(db,'player',id);
        return updateDoc(playerDoc,updatedPlayer)
    };
    deletePlayer = (id) => {
        const playerDoc = doc(db,'player',id)
        return deleteDoc(playerDoc)
    };
    deleteMeeting = (id) => {
        const playerDoc = doc(db,'meeting',id)
        return deleteDoc(playerDoc)
    };
    getAllPlayers = () =>{
        return getDocs(CollectionplayerRef)
    };
    getPlayer =(id) => {
        const playerDoc = (db,'player',id) 
        return getDoc(playerDoc)
    }
}
export default new PlayerDataService();
