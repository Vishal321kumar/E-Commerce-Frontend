import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  fetchLoggedInUserOrders,fetchLoggedInUser, updateUser} from './userAPI';

const initialState = {
  status: 'idle',
  userInfo: null, 
  // this info will be used in case of detailed user info, while auth will
  // only be used for loggedInUser id etc checks
};



export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    // The value we return becomes the `fulfilled` action payload
    console.log('fetchLoggedInUserOrders',response.data)
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (id) => {
    const response = await fetchLoggedInUser(id);
    // The value we return becomes the `fulfilled` action payload
    console.log('logged in user',response.data)
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    // this is name mistake
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
        console.log('ordersUserpending');
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.orders = action.payload;
        console.log('ordersUser',action.payload);


      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // earlier there was loggedInUser variable in other slice
        state.userInfo = action.payload;
        // state.loggedInUser = action.payload;
        //only one <exist></exist>

      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different or more from logged-in User info
        state.userInfo = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;




export default userSlice.reducer;


// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// loginUser
// import { loginUser, updateUser,
//   createUser,
//   signOut,
//   checkAuth,
//   resetPasswordRequest,
//   resetPassword, } from '../user/userAPI';



// const initialState = {
//   loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
//   status: 'idle',
//   error: null,
//   userChecked: false,
//   mailSent: false,
//   passwordReset:false
// };

// export const createUserAsync = createAsyncThunk(
//   'user/createUser',
//   async (userData) => {
//     const response = await createUser(userData);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

// export const loginUserAsync = createAsyncThunk(
//   'user/loginUser',
//   async (loginInfo, { rejectWithValue }) => {
//     try {
//       const response = await loginUser(loginInfo);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error);
//     }
//   }
// );

// export const checkAuthAsync = createAsyncThunk('user/checkAuth', async () => {
//   try {
//     const response = await checkAuth();
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// });
// export const resetPasswordRequestAsync = createAsyncThunk(
//   'user/resetPasswordRequest',
//   async (email,{rejectWithValue}) => {
//     try {
//       const response = await resetPasswordRequest(email);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error);

//     }
//   }
// );

// export const resetPasswordAsync = createAsyncThunk(
//   'user/resetPassword',
//   async (data,{rejectWithValue}) => {
//     try {
//       const response = await resetPassword(data);
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error);

//     }
//   }
// );

// export const signOutAsync = createAsyncThunk(
//   'user/signOut',
//   async () => {
//     const response = await signOut();
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

// export const authSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createUserAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(createUserAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.loggedInUserToken = action.payload;
//       })
//       .addCase(loginUserAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(loginUserAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.loggedInUserToken = action.payload;
//       })
//       .addCase(loginUserAsync.rejected, (state, action) => {
//         state.status = 'idle';
//         state.error = action.payload;
//       })
//       .addCase(signOutAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(signOutAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.loggedInUserToken = null;
//       })
//       .addCase(checkAuthAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(checkAuthAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.loggedInUserToken = action.payload;
//         state.userChecked = true;
//       })
//       .addCase(checkAuthAsync.rejected, (state, action) => {
//         state.status = 'idle';
//         state.userChecked = true;
//       })
//       .addCase(resetPasswordRequestAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.mailSent = true;
//       })
//       .addCase(resetPasswordAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(resetPasswordAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.passwordReset = true;
//       })
//       .addCase(resetPasswordAsync.rejected, (state, action) => {
//         state.status = 'idle';
//         state.error = action.payload
//       })
//   },
// });

// export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
// export const selectError = (state) => state.auth.error;
// export const selectUserChecked = (state) => state.auth.userChecked;
// export const selectMailSent = (state) => state.auth.mailSent;
// export const selectPasswordReset = (state) => state.auth.passwordReset;

// // export const { } = authSlice.actions;

// export default authSlice.reducer;