import { addDoc, collection } from "@firebase/firestore";
import { getAllData } from "./FirebaseProvider";

const handleSubmit = (testdata) => {
  const ref = collection(getAllData, "test_data"); // Firebase creates this automatically

  let data = {
    testData: testdata,
  };

  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};

export default handleSubmit;
