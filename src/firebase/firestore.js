import 'firebase/firestore';
import 'firebase/functions';
import { readable, writable } from 'svelte/store';

import firebase from 'firebase/app';
import { firebaseConfig } from './config.js';

export { firebase };
export default firebase.initializeApp(firebaseConfig).firestore(app);
