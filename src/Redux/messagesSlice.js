import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export let getMessages = createAsyncThunk("message/getMessages", async () => {let { data } = await axios.get("https://sara7aiti.onrender.com/api/v1/message", {
    headers: {
            token: localStorage.getItem("userToken"),
          },
    });
    return data.allMessages;
});

export let addMessage = createAsyncThunk("message/addMessage",async ({ messageContent, receivedId }) => {
        const { res } = await axios.post("https://sara7aiti.onrender.com/api/v1/message", { messageContent, receivedId });
        return res.data;
    }
);

const messageSlice = createSlice({
    name: "message",
    initialState: { message: [], setMessage: null },
    extraReducers: (builder) => {
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.message = action.payload;
        });

        builder.addCase(addMessage.fulfilled, (state, action) => {
            state.setMessage = action.payload;
        });
    },
});

export let messageReducer = messageSlice.reducer;






//createAsyncThunk تكلم api بعرفها متعير من نوع الاسم اللي جوا ال createSlice سلاش اسم الفانكشن
//extraReducers بتاخد builder نحط فيها حالات الapi نجح fulfilled
//parameter array فاضي لل initialstate نخزن فيه الداتا اللي راجعة من ال api post[] ونحط الارراي في dependancies of useEffect()
