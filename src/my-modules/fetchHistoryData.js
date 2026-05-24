
export const fetchHistoryData = async (getDocs, collection, db) => {
    let tags = "";

    const querySnapshot = await getDocs(collection(db, "reports"));

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