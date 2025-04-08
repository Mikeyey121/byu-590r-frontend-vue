import userService from '../services/user.service';

const initialState = { user: { avatar: '', email: '', email_verified_at: '', name: '' } };

export const user = {
namespaced: true,
state: initialState,
actions: {
getUser({ commit }) {
return userService.getUser().then(
user => {
commit('setUser', user);
return Promise.resolve(user);
},
response => {
return Promise.resolve(response);
}
);
},
uploadAvatar({ commit }, image) {
return userService.uploadAvatar(image).then(
response => {
return Promise.resolve(response);
}
);
},
removeAvatar({ commit }) {
return userService.removeAvatar().then(
response => {
return Promise.resolve(response);
}
);
},
sendVerificationEmail({ commit }, emailData) {
return userService.sendVerificationEmail(emailData).then(
response => {
return Promise.resolve(response);
}
);
},
changeEmail({ commit }, changeEmail) {
return userService.changeEmail(changeEmail).then(
user => {
commit('setEmail', user);
},
response => {
return Promise.resolve(response);
}
);
}

},
mutations: {
setUser(state, user) {
state.user = user;

// If user has an avatar, update auth store too
if (user.avatar) {
    const authUser = JSON.parse(localStorage.getItem('user'));
    if (authUser) {
        authUser.avatar = user.avatar;
        localStorage.setItem('user', JSON.stringify(authUser));
    }
}
},
setEmail(state, user) {
state.user.email = user.email;
},
setAvatar(state, avatar) {
state.user.avatar = avatar;
// Also update the auth module
const authUser = JSON.parse(localStorage.getItem('user'));
if (authUser) {
authUser.avatar = avatar; // This will be null when avatar is removed
localStorage.setItem('user', JSON.stringify(authUser));
}
}
},
getters: {
getUser: state => {
return state.user
}
}
};