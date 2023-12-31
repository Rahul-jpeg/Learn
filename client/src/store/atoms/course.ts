import { atom } from 'recoil';

export interface Course {
    map(arg0: (data: Course, index: number) => import("react").ReactNode): import("react").ReactNode;
    _id: string;
    title: string;
    description: string;
    imageLink: string;
    price: string;
    author: string;
    published: boolean;
    __v: number
}

export const courseAtom = atom<{ isLoading: boolean, course: null | Course }>({
    key: 'courseAtom',
    default: {
        isLoading: true,
        course: null
    },
});
