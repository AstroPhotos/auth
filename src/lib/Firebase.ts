import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { from, Observable, Subject, throwError } from "rxjs";

import type { FirebaseApp } from "firebase/app";
import type { Auth, UserCredential, User } from "firebase/auth";

class LocalFirebase {
  private fbApp?: FirebaseApp;
  private auth?: Auth;

  private onAuthStateChangedSubject: Subject<User | undefined> = new Subject();
  public onAuthStateChanged = this.onAuthStateChangedSubject.asObservable();

  constructor() {
    this.initialize();
  }

  initialize(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyBwhccOfZErQ9oaRCk4P-0dx-m9eJ3YuWA",
      authDomain: "astrophoto-fc934.firebaseapp.com",
      // The value of `databaseURL` depends on the location of the database
      // databaseURL: "https://DATABASE_NAME.firebaseio.com",
      projectId: "astrophoto-fc934",
      // storageBucket: "astrophoto-fc934.appspot.com",
      // messagingSenderId: "SENDER_ID",
      // appId: "APP_ID",
      // // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
      // measurementId: "G-MEASUREMENT_ID",
    };

    this.fbApp = initializeApp(firebaseConfig);
    this.auth = getAuth(this.fbApp);

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.onAuthStateChangedSubject.next(user);
      } else {
        this.onAuthStateChangedSubject.next(undefined);
      }
    });
  }

  login(email: string, password: string): Observable<UserCredential> {
    if (!this.auth) {
      return throwError(() => new Error("Firebase not initialized"));
    }
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(email: string, password: string): Observable<UserCredential> {
    if (!this.auth) {
      return throwError(() => new Error("Firebase not initialized"));
    }
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }
}

let internalAPI: LocalFirebase = new LocalFirebase();

export default internalAPI;
