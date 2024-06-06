import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    _id : '',
    name : '',
    email : '',
    profile_pic : '',
    profile_pic_public_id : '',
    onlineUsers : [] 
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser : (state, action) => {
            state._id = action.payload._id,
            state.name = action.payload.name,
            state.email = action.payload.email,
            state.profile_pic = action.payload.profile_pic 
        },
        setProfilePicPublicId : (state, action) => {
            state.profile_pic_public_id = action.payload 
        },
        logout : (state, action) => {
            state._id = '',
            state.name = '',
            state.email = '',
            state.profile_pic = '',
            state.profile_pic_public_id = '',
            state.onlineUsers = [],
            state.socketConnection = ''
        },
        setOnlineUsers : (state, action) => {
            state.onlineUsers = action.payload 
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUser, setProfilePicPublicId, logout, setOnlineUsers } = userSlice.actions

export default userSlice.reducer 