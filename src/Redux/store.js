import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";


let store = configureStore({
    reducer: {
        counterRed: counterReducer,
    }
})


export default store;









//Redux عبارة عن فايل زي ال context بس فيه كذه slice جواهم reducers اللي هو شبيه الكونتكست كل رديوسرس بيعمل خاصية معينة ومتشاف من كل الكومبوننت بس موجودين كلهم في ال Store في فايل واحد بدل ما اعمل كونكست لكل واحد فبهم
// store جواه slices جواه reducers بتعمل اكشن زي انها تزود كاونتر او تنقصه
//counter reducer - token reducer عشان اشوفهم و استخدمهم بعمل useSelector لو عايز اعمل فاير اكشن فيهم اعمل dispatch
//عشان اتعامل مع ال redux استخدم redux toolkit وعشان اربطها بالرياكت استخدم react redux
//useSelector يكلم ال reducer زي كاونتر و   - useDispatch يكلم الاكشنز زي زيادة ونقص الكاونتر
//نحط تاجة <Provider> تشيل جواها ال app.js 
//لو ال key و value نفس الاسم نكتب الاسم مرة واحدة  x:x = x