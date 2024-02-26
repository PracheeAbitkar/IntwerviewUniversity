import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState={
    msg:"",
    user:"",
    token:"",
    loading:false,
    error:"",
    key:"",
    non_field_errors:"",
    isAuthenticated: false,
    detail:""

}

export const feedbackuser=createAsyncThunk('feedbackuser',async(body)=>{
    const res =await fetch("https://round-unit-43333.botics.co/support/submit_feedback/",{
        method:"post",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body:JSON.stringify(body)
    })
    return await res.json();
})


export const contactus=createAsyncThunk('contactus',async(body)=>{
    const res =await fetch("https://round-unit-43333.botics.co/contact/contact_us_email/",{
        method:"post",
        headers:{
            'Content-Type': 'application/json',
            
        },
        body:JSON.stringify(body)
    })
    return await res.json();
})


const feedBack = createSlice({
    name:"feedbackUser",
    initialState,
    reducers:{

    },
    extraReducers:{
        [feedbackuser.pending]:(state,action)=>{
            state.loading=true
        },
        [feedbackuser.fulfilled]:(state,{payload:{error,msg,non_field_errors}})=>{
            state.loading=false;
            if(!msg){
                state.error=error
                // state.non_field_errors =non_field_errors[0]
                toast.error(non_field_errors[0], {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                  });
            }else{
                state.msg= msg
                toast.success(msg, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                  });
            }
        },
        [feedbackuser.rejected]:(state,action)=>{
            state.loading=true
        },  
    }

})

export default feedBack.reducer