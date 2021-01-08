declare var firebase: any;
declare var M: any;
M.AutoInit();
var firebaseConfig = {
  apiKey: 'AIzaSyAcw_8GqIL8M8s5d-4GlPE3cKK45AC1_7A',
  authDomain: 'client-panel-c2229.firebaseapp.com',
  projectId: 'client-panel-c2229',
  storageBucket: 'client-panel-c2229.appspot.com',
  messagingSenderId: '313252994761',
  appId: '1:313252994761:web:e310128de296c2ecb57718',
  measurementId: 'G-XKTDGZ97YL',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//! firestore & auth
export const db = firebase.firestore();
export const auth = firebase.auth();

//! components ui
export function Ui(): void {
  var elems = document.querySelectorAll('#navbarDropdown');
  var instances = M.Dropdown.init(elems);

  var elems = document.querySelectorAll('.parallax');
  var instances = M.Parallax.init(elems);

  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems);
}

// ! interfaces

export interface Client {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  balance?: number;
  created: Date;
}
export type User = {
  name: string;
  email: string;
  password: string;
};
