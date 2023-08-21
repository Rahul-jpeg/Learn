import { selector } from "recoil";
import { courseAtom } from "../atoms/course";

export const isCourseLoading = selector({
    key: 'isCourseLoadingState',
    get: ({ get }) => {
        const state = get(courseAtom);

        return state.isLoading;
    }
})

export const courseDetails = selector({
    key: 'courseDetailsState',
    get: ({ get }) => {
        const state = get(courseAtom);

        return state.course;
    }
})

export const courseTitle = selector({
    key: 'courseTitleState',
    get: ({ get }) => {
        const state = get(courseAtom);

        if (state.course) {
            return state.course.title;
        }
        return "";
    }
})


export const coursePrice = selector({
    key: 'coursePriceState',
    get: ({ get }) => {
        const state = get(courseAtom);

        if (state.course) {
            return state.course.price;
        }
        return "";
    }
})


export const courseImage = selector({
    key: 'courseImageState',
    get: ({ get }) => {
        const state = get(courseAtom);

        if (state.course) {
            return state.course.imageLink;
        }
        return "";
    }
})

export const courseDescription = selector({
    key: 'courseDescriptionState',
    get: ({ get }) => {
        const state = get(courseAtom);

        if (state.course) {
            return state.course.description;
        }
        return "";
    }
})