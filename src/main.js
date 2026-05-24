import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs ,addDoc } from "firebase/firestore";

// 設定情報
const firebaseConfig = {
  apiKey: "AIzaSyBGU4WiF9VcRDCaOGwpNk4qPT85xVG3xJo",
  authDomain: "daily-report-726c2.firebaseapp.com",
  projectId: "daily-report-726c2",
  storageBucket: "daily-report-726c2.firebasestorage.app",
  messagingSenderId: "829028632119",
  appId: "1:829028632119:web:27b88c2bfa80845acce1b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud FireStoreの初期化
const db = getFirestore(app);

// Cloud FireStoreから取得したデータを表示
const fetchHistoryData = async () => {
    let tags = "";

    // reportsのコレクションのデータを取得
    const querySnapshot = await getDocs(collection(db, "reports"));

    // データをテーブル表の形式に合わせてHTMLに挿入
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tags += `<tr>
                    <td>${doc.data().date}</td>
                    <td>${doc.data().name}</td>
                    <td>${doc.data().work}</td>
                    <td>${doc.data().comment}</td>
                </tr>`
    });
    document.getElementById("js-history").innerHTML = tags;
};

// Cloud FireStoreから取得したデータを表示する
if(document.getElementById("js-history")) {
    fetchHistoryData();
}

// Cloud FireStoreにデータを送信する
const submitDate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
        const docRef = await addDoc(collection(db, "reports"), {
            date: new Date(),
            name: formData.get("name"),
            work: formData.get("work"),
            comment:formData.get("comment")
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

// Cloud FireStoreにデータを送信する
if(document.getElementById("js-form")) {
    document.getElementById("js-form").addEventListener("submit", (e) => submitDate(e));
};
