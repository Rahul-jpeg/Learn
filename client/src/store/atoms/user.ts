import { atom } from 'recoil';

export const userState = atom<{
    isLoading: boolean;
    userUsername: string | null;
}>({
    key: 'userState',
    default: {
        isLoading: true,
        userUsername: null,
    },
});

export const loginStatus = atom<boolean>({
    key: 'loginStatusState',
    default: false
})
