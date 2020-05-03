import db, { firebase } from './firestore';

const listeners = new Map();

// add a new realtime listener to firestore collection
function firestoreCollectionListener(collectionName) {
  return db.collection(collectionName).onSnapshot((snapshot) => {
    let changes = snapshot.docChanges().map((change) => {
      return {
        type: change.type,
        id: change.doc.id,
        data: change.doc.data(),
      };
    });
    // synchronously call each callback registered for this collection listener
    listeners.get(collectionName).registrations.forEach((cb) => cb(changes));
  });
}

//
// adds a listener to the given collection which calls the given
// callback function whenever the given collection is updated in firestore
//
export function addListener(collectionName, callback) {
  if (!listeners.has(collectionName)) {
    // first registration creates the realtime listener
    let registration = {
      unsubscribe: firestoreCollectionListener(collectionName),
      registrations: [callback],
    };
    listeners.set(collectionName, registration);
  } else {
    // subsequent registrations add callback only
    listeners.get(collectionName).registrations.push(callback);
  }

  return function unregister() {
    if (listeners.has(collectionName)) {
      let cbs = listeners.get(collectionName);
      let ix = cbs.registrations.indexOf(callback);
      if (ix >= 0) {
        cbs.registrations.splice(ix, 1);
        if (cbs.registrations.length == 0) {
          // no more listeners - remove realtime listener
          cbs.unsubscribe();
          listeners.delete(collectionName);
        }
      }
    }
  };
}

// Generic class for managing CRUD operation in firestore collection
export class FirestoreCollection {
  constructor(collectionName) {
    this.collectionRef = db.collection(collectionName);
    this.collectionName = collectionName;
  }

  async add(contact) {
    return await this.collectionRef.add(contact);
  }

  async get(id) {
    let doc = await this.collectionRef.doc(id).get();
    if (doc.exists) {
      return { id: doc.id, data: doc.data() };
    } else {
      return null;
    }
  }

  // each where condition is an array ["{fieldName}", "{operation}", "{value}"]
  async getAll(...whereConditions) {
    let ref = this.collectionRef;
    whereConditions.forEach((condition) => (ref = ref.where(...condition)));
    let docs = await ref.get();
    let data = [];
    docs.forEach((doc) => {
      data.push({ id: doc.id, data: doc.data() });
    });
    return data;
  }

  // doc may contain only those fields which need to be updated,
  // others will be unaffected
  async update(id, doc) {
    await this.collectionRef.doc(id).update(doc);
  }

  async delete(id) {
    await this.collectionRef.doc(id).delete();
  }

  async deleteFields(id, fieldNameList) {
    if (fieldNameList instanceof Array) {
      let fields = {};
      fieldNameList.forEach(
        (field) => (fields[field] = firebase.firestore.FieldValue.delete())
      );
      await this.collectionRef.doc(id).update(fields);
    }
  }
}
