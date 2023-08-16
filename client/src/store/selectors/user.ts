import { userState } from "../atoms/user";
import { selector } from "recoil";

export const userUsername = selector({
    key: 'userUsernameState',
    get: ({ get }) => {
        const state = get(userState);

        return state.userUsername;
    },
});


