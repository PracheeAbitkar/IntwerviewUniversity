import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    msg: "",
    user: "",
    token: "",
    loading: false,
    error: "",
    key: "",
    non_field_errors: "",
    isAuthenticated: false,
    detail: "",
    userdata: [],
    updateddata: [],
}

export const changePassword = createAsyncThunk('changepassword', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/api/v1/changepassword/", {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})



export const signinuser = createAsyncThunk('signinuser', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/rest-auth/login/", {
        method: "post",
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(body)
    })
    return await res.json();
})

export const facebookLogin = createAsyncThunk('facebookLogin', async (body) => {
    const res = await fetch("https://cold-hat-40370.botics.co/modules/social-auth/facebook/login/", {
        method: "post",
        headers: {
            'Content-Type': 'application/json',

        },
        body: body
    })
    return await res.json();
})

export const googleLogin = createAsyncThunk('googleLogin', async (response) => {
    // const res = await fetch("https://cold-hat-40370.botics.co/modules/social-auth/google/login/", {
    //     method: "post",
    //     headers: {
    //         'Content-Type': 'application/json',

    //     },
    //     body: body
    // })
    const res = response;
    return await res.json();
})

export const signUpUser = createAsyncThunk('signupuser', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/rest-auth/registration/", {
        method: "post",
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    return await res.json()
})
export const forgetPassword = createAsyncThunk('forgetpassword', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/api/v1/sendresetpasswordemail/", {
        method: "post",
        headers: {
            'content-Type': "application/json",
        },
        body: JSON.stringify(body)
    })
    const resData = await res.json()

    if (resData?.non_field_errors) {
        toast.error(resData.non_field_errors[0], {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
        });
    }
    // else if (resData) (
    //     toast.error('something went wrong', {
    //         position: toast.POSITION.TOP_RIGHT,
    //         autoClose: 2000,
    //         hideProgressBar: true,
    //     })
    // )
    return resData
})
export const resetPassword = createAsyncThunk('resetpassword', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/rest-auth/password/reset/confirm/", {
        method: "post",
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(body)
    })
    return await res.json();
})


export const getUserProfile = createAsyncThunk('getuserprofile', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/rest-auth/user/", {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})


export const getUserData = createAsyncThunk('getUserData', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/users/", {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})



export const updateProfile = createAsyncThunk('updateprofile', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/api/v1/edituserdetail/", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})


export const getQuestion = createAsyncThunk('getQuestion', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/modules/openai/chat/completions/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})

export const helpme = createAsyncThunk('helpme', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/help/chatgpt/helpme/completion/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})

export const extractText = createAsyncThunk('extractText', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/api-docs/#/extract_text", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})


export const pasteResume = createAsyncThunk('pasteResume', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/paste_resume/paste_form/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})

export const uploadPhoto = createAsyncThunk('uploadPhoto', async (body) => {

    const res = await fetch("https://round-unit-43333.botics.co/api/v1/uploadpicture/", {
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: body
    }).then(res => {
        ;
    }).catch(error => {
        console.log(error, "error");
    })
    // return await res.json();
})


export const favoriteAnswer = createAsyncThunk('favoriteAnswer', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/favourite_answer/favorite_answers/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})

export const getFavoriteAnswer = createAsyncThunk('getFavoriteAnswer', async () => {
    const res = await fetch("https://round-unit-43333.botics.co/favourite_answer/favorite_answers/", {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        }
    })
    return await res.json();
})

export const getFavoriteAnswerbyId = createAsyncThunk('getFavoriteAnswerbyId', async (id) => {
    const res = await fetch(`https://round-unit-43333.botics.co/favourite_answer/favorite_answers/${id}`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        }
    })
    return await res.json();
})


export const InitiationQuestions = createAsyncThunk('InitiationQuestions', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/initiation_questions/save_job_applicant/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})

export const getInitiationQuestions = createAsyncThunk('getInitiationQuestions', async () => {
    const res = await fetch("https://round-unit-43333.botics.co/initiation_questions/get_job_applicants/", {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        }
    })
    return await res.json();
})


export const getResume = createAsyncThunk('getResume', async () => {
    const res = await fetch("https://round-unit-43333.botics.co/resumeget/", {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        }
    })
    return await res.json();
})

export const getPasteResume = createAsyncThunk('getPasteResume', async () => {
    const res = await fetch("https://round-unit-43333.botics.co/paste_resume/resume/detail/", {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        }
    })
    return await res.json();
})


export const saveInterviewSession = createAsyncThunk('saveInterviewSession', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/savesave-interview-session/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})

export const getInterviewSession = createAsyncThunk('getInterviewSession', async () => {
    const res = await fetch("https://round-unit-43333.botics.co/saveget-interview-sessions/", {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        }
    })
    return await res.json();
})


export const getInterviewSessionById = createAsyncThunk('getInterviewSessionById', async (id) => {
    const res = await fetch(`https://round-unit-43333.botics.co/savesessions/${id}/`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        }
    })
    return await res.json();
})

export const updateExperience = createAsyncThunk('updateExperience', async (body) => {
    const res = await fetch("https://round-unit-43333.botics.co/initiation_questions/update_job_applicants/", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(body)
    })
    return await res.json();
})


// /favourite_answer/favorite_answers/

//https://cold-hat-40370.botics.co/users/update-profile

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {


        addToken: (state) => {
            state.key = localStorage.getItem('token')
        },
        addUser: (state, action) => {
            state.key = localStorage.getItem('token')
        },
        addAuthenticator: (state, action) => {
            state.isAuthenticated = true;
            state.token = localStorage.getItem('token')
            localStorage.setItem('isAuthenticated', true)
        },
        logout: (state) => {
            state.key = null
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('role')
            localStorage.removeItem('userId')
            sessionStorage.removeItem("isAuthenticated");
            localStorage.removeItem('isAuthenticated')
            sessionStorage.setItem("isAuthenticated", false);
            localStorage.clear();
            sessionStorage.clear();
            state.isAuthenticated = false;

            //     if (typeof window.FB !== 'undefined') {
            //     window.FB.getLoginStatus(function (response) {
            //         if (response.status === 'connected') {
            //             ;
            //             const accessToken = response.authResponse.accessToken;


            //             window.FB.logout(function (response) {
            //                 ;
            //                 ;
            //                 ;

            //             });
            //         }
            //     });
            // }

        },

    },
    extraReducers: {
        [signinuser.pending]: (state, action) => {
            state.loading = true
        },

        [signinuser.fulfilled]: (state, { payload: { error, msg, token, user, key, non_field_errors } }) => {
            state.loading = false;
            if (key) {
                state.isAuthenticated = true;
                state.msg = msg
                state.token = token
                state.user = user
                console.log(user,"user")
                toast.success('Login Successful!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                });

                localStorage.setItem('msg', msg)
                localStorage.setItem('token', key)
                // localStorage.setItem('isAuthenticated', state.isAuthenticated)
                localStorage.setItem('user', JSON.stringify(user))
            } else {
                state.error = error
                state.isAuthenticated = false;
                toast.error(non_field_errors[0], {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                });

            }
        },

        [signinuser.rejected]: (state, action) => {
            state.loading = true
        },
        [signUpUser.pending]: (state, action) => {
            state.loading = true
        },
        [signUpUser.fulfilled]: (state, action) => {
            state.loading = false;

            // if(action.payload.key){
            //     toast.success('Sign-up Successful!', {
            //         position: toast.POSITION.TOP_RIGHT,
            //         autoClose: 2000,
            //         hideProgressBar: true,
            //     });
            // } else{
            //     const error= action.payload.email[0];
            //     toast.error(error, {
            //         position: toast.POSITION.TOP_RIGHT,
            //         autoClose: 2000,
            //         hideProgressBar: true,
            //     });
            // }



            // if (key) {
            //     state.isAuthenticated = true;
            //     state.msg = msg
            //     state.token = token
            //     state.user = user


            //     localStorage.setItem('msg', msg)
            //     localStorage.setItem('token', key)
            //     localStorage.setItem('isAuthenticated', state.isAuthenticated)
            //     localStorage.setItem('user', JSON.stringify(user))
            // } else {
            //     state.error = error
            //     state.isAuthenticated = false;
            //     toast.error("Error !! Please Enter a valid Details", {
            //         position: toast.POSITION.TOP_RIGHT,
            //         autoClose: 2000,
            //         hideProgressBar: true,
            //     });
            // }
        },
        [signUpUser.rejected]: (state, action) => {
            state.loading = true
        },
        [forgetPassword.pending]: (state, action) => {
            state.loading = true
        },
        [forgetPassword.fulfilled]: (state, { payload: { error, msg } }) => {
            state.loading = false;
            if (msg) {
                // toast.success('Email Sent Sucessfully!', {
                //     position: toast.POSITION.TOP_RIGHT,
                //     autoClose: 2000,
                //     hideProgressBar: true,
                // });
            }
            if (error) {
                // state.error = error
                // toast.error(error, {
                //     position: toast.POSITION.TOP_RIGHT,
                //     autoClose: 2000,
                //     hideProgressBar: true,
                // });
            } else {
                state.msg = msg

            }
        },
        [forgetPassword.rejected]: (state, action) => {
            state.loading = true
        },
        [resetPassword.pending]: (state, action) => {
            state.loading = true
        },
        [resetPassword.fulfilled]: (state, { payload: { error, detail } }) => {
            state.loading = false;

            if (detail) {

                toast.success('Password has been Reset', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            } else {
                toast.error("Invalid Password", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        },
        [resetPassword.rejected]: (state, action) => {
            state.loading = true
        },
        [changePassword.pending]: (state, action) => {
            state.loading = true
        },
        [changePassword.fulfilled]: (state, { payload: { error, detail, message } }) => {
            state.loading = false;
            if (detail) {
                state.detail = detail
                toast.success(detail, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
            if (error) {
                state.error = error[0]
                toast.error(error[0], {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
            if (message) {
                state.message = message
                toast.success(message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                });
                if(message === "Password changed successfully"){
                    localStorage.removeItem('token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('role')
                    localStorage.removeItem('userId')
                    localStorage.removeItem('isAuthenticated')
                    localStorage.setItem('isAuthenticated', false)
                    localStorage.clear();
                    window.location.href = "/"
                }
            }
        },
        [changePassword.rejected]: (state, action) => {
            state.loading = true
        },


        [getUserProfile.pending]: (state, action) => {
            state.loading = true
        },
        [getUserProfile.fulfilled]: (state, action) => {
            state.loading = false;
            ;
            state.userdata = action.payload

        },
        [getUserProfile.rejected]: (state, action) => {
            state.loading = true
        },


        [updateProfile.pending]: (state, action) => {
            state.loading = true
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.loading = false;
            ;

            state.updateddata = action.payload

            if (action.payload) {
                // alert('Data saved successfully')
                // toast.success('Profile updated successfully', {
                //     position: toast.POSITION.TOP_RIGHT,
                //     autoClose: 2000,
                //     hideProgressBar: false,
                // });
            } else {
                // alert('Error While saving data')
                // toast.error("Error While saving data", {
                //     position: toast.POSITION.TOP_RIGHT,
                //     autoClose: 2000,
                //     hideProgressBar: true,
                // });
            }


        },
        [updateProfile.rejected]: (state, action) => {
            state.loading = true
        },

        [uploadPhoto.pending]: (state, action) => {
            state.loading = true
        },
        [uploadPhoto.fulfilled]: (state, action) => {
            state.loading = false;
            ;

            state.updateddata = action.payload

            if (action.payload.username) {
                toast.success('Photo uploaded successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: false,
                });
            } else {
                toast.error("Error While saving data", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }


        },
        [uploadPhoto.rejected]: (state, action) => {
            state.loading = true
        },


        [facebookLogin.pending]: (state, action) => {
            state.loading = true
        },

        [facebookLogin.fulfilled]: (state, { payload: { error, msg, token, user, key, non_field_errors } }) => {
            state.loading = false;
            if (key) {
                state.isAuthenticated = true;
                state.msg = msg
                state.token = token
                state.user = user

                toast.success('Login Successful!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                });
          
                localStorage.setItem('msg', msg)
                localStorage.setItem('token', key)
                localStorage.setItem('isAuthenticated', state.isAuthenticated)
                localStorage.setItem('user', JSON.stringify(user))
            } else {
                state.error = error
                state.isAuthenticated = false;
                toast.error(non_field_errors[0], {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        },

        [facebookLogin.rejected]: (state, action) => {
            state.loading = true
        },

        [googleLogin.pending]: (state, action) => {
            state.loading = true
        },

        [googleLogin.fulfilled]: (state, { payload: { error, msg, token, user, key, non_field_errors } }) => {
            state.loading = false;
            if (key) {
                state.isAuthenticated = true;
                state.msg = msg
                state.token = token
                state.user = user

                toast.success('Login Successful!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                });

                localStorage.setItem('msg', msg)
                localStorage.setItem('token', key)
                localStorage.setItem('isAuthenticated', state.isAuthenticated)
                localStorage.setItem('user', JSON.stringify(user))
            } else {
                state.error = error
                state.isAuthenticated = false;
                toast.error(non_field_errors[0], {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    hideProgressBar: true,
                });
            }
        },

        [googleLogin.rejected]: (state, action) => {
            state.loading = true
        },


        [getUserData.pending]: (state, action) => {
            state.loading = true
        },
        [getUserData.fulfilled]: (state, action) => {
            state.loading = false;
            state.userdata = action.payload

        },
        [getUserData.rejected]: (state, action) => {
            state.loading = true
        },






    }
})

export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const { addToken, addUser, logout, addAuthenticator } = authSlice.actions
export default authSlice.reducer
