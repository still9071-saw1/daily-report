import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs ,addDoc } from "firebase/firestore";
import { fetchHistoryData } from "./my-modules/fetchHistoryData";
import { submitDate } from "./my-modules/submit-data";

// 設定情報
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud FireStoreの初期化
const db = getFirestore(app);

// Cloud FireStoreから取得したデータを表示する
if(document.getElementById("js-history")) {
    fetchHistoryData(getDocs, collection, db);
}

// Cloud FireStoreにデータを送信する
if(document.getElementById("js-form")) {
    document.getElementById("js-form").addEventListener("submit", (e) => submitDate(e, addDoc, collection, db));
};
