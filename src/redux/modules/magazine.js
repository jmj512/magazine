// magazine.js
import { db } from "../../shared/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Actions
const LOAD = "magazine/LOAD";
const CREATE = "magazine/CREATE";
// const UPDATE = "magazine/UPDATE";
// const DELETE = "magazine/DELETE";


const initialState = {
  list: [],
  user: {
    id: "qwer",
    nick: "987654",
  },
};

// Action Creators
export function loadMagazine(magazine_list) {
  return { type: LOAD, magazine_list };
}

export function createMagazine(magazine) {
//   console.log("액션을 생성할거야", magazine);
  const red = magazine;
  return { type: CREATE, red }; 
}

// export function updateMagazine(bucket_index) {
//   return { type: UPDATE, bucket_index };
// }

// export function deleteMagazine(bucket_index) {
//   console.log("지울 버킷 인덱스", bucket_index);
//   return { type: DELETE, bucket_index };
// }

// middlewares
export const loadMagaFB = () => {
  return async function (dispatch) {
    const magazine_data = await getDocs(collection(db, "posts"));
    // console.log(magazine_data);

    let magazine_list = [];

    magazine_data.forEach((m) => {
      // console.log(m.id, m.data());
      magazine_list.push({id: m.id, ...m.data()});
    });

    // console.log(magazine_list);

    dispatch(loadMagazine(magazine_list));
  };
};

// export const addMagaFB = (bucket) => {
//   return async function (dispatch) {
//     const docRef = await addDoc(collection(db, "bucket"), bucket);
//     const bucket_data = {id: docRef.id, ...bucket};

//     dispatch(createMagazine(bucket_data));
//   }
// };

// export const updateBucketFB = (bucket_id) => {
//   return async function (dispatch, getState) {
//     const docRef = doc(db, "bucket", bucket_id);
//     await updateDoc(docRef, {completed: true});

//     console.log(getState().bucket);
//     const _bucket_list = getState().bucket.list;
//     const bucket_index = _bucket_list.findIndex((b) => {
//       return b.id === bucket_id;
//     });

//     dispatch(updateBucket(bucket_index));
//   };
// };

// export const deleteBucketFB = (bucket_id) => {
//   return async function (dispatch, getState) {
//     if (!bucket_id) {
//       window.alert("아이디가 없네요!");
//       return;
//     }

//     const docRef = doc(db, "bucket", bucket_id);
//     await deleteDoc(docRef);

//     const _bucket_list = getState().bucket.list;
//     const bucket_index = _bucket_list.findIndex((b) => {
//       return b.id === bucket_id;
//     });

//     dispatch(deleteBucket(bucket_index));
//   }
// }

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "magazine/LOAD": {
      // console.log(action.magazine_list);
      return { list: action.magazine_list, user: state.user };
    }
    case "magazine/CREATE": {
      console.log("state다!!", state, "액숀!!!!", action.red);
      const new_list = [...state.list, action.red ]
      console.log(new_list);
      return {...state, list: new_list };
    }

    // case "magazine/UPDATE": {
    //   const new_bucket_list = state.list.map((l, idx) => {
    //     if (parseInt(action.bucket_index) === idx) {
    //       return { ...l, completed: true };
    //     } else {
    //       return l;
    //     }
    //   });
    //   console.log({ list: new_bucket_list });
    //   return { list: new_bucket_list };
    // }

    // case "magazine/DELETE": {
    //   console.log(state, action);
    //   const new_bucket_list = state.list.filter((l, idx) => {
    //     console.log(
    //       parseInt(action.bucket_index) !== idx,
    //       parseInt(action.bucket_index),
    //       idx
    //     );
    //     return parseInt(action.bucket_index) !== idx;
    //   });

    //   console.log(new_bucket_list);
    //   return { list: new_bucket_list };
    // }

    default:
      return state;
  }
}
