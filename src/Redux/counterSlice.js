import { createSlice } from "@reduxjs/toolkit";



let initialState = { counter: 0 };
let counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increase: (state) => {
            state.counter += 1;
        },
        decrease: (state) => {
            state.counter -= 1;
        },
        increaseByAmount:(state, action) => {
    console.log(action,"action");
            state.counter += action.payload;
        }
    },
    
});


export let counterReducer = counterSlice.reducer;
export let { increase, decrease } = counterSlice.actions;



//payload ياخد القيمة اللي عايز ازود فيها من البراميتر في الكول في اي مكان بتبقي جوا ال action اللي في براميتر الفانكشن
//name: "counter", لو فيه فانكشن بنفس الاسم في اي slice تاني بنعرف نفرق بينهم بالاسم counter/function name