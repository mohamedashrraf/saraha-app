import { createContext, useState } from "react";


export let CounterContext = createContext()

function CounterContextProvider({ children }) {
    const [counter, setCounter] = useState(10);

    return <CounterContextProvider value={{counter,setCounter}}>
        {children}
    </CounterContextProvider>
}

export default CounterContextProvider;



//context زي ال service يخلي الكومبوننت اللي ملهاش علاقة ببعض تكلم بعض
//نحط تاجته في فايل الاندكس وجواه فايل app
//children هي فايل الاب بكل اللي فيه عملناله دستركت عشان يتشاف