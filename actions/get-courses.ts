// import { Course, Category } from "@prisma/client"
// import { getProgress } from "@/actions/get-progress"

// type CourseWithProgressWithCategory {
//     category: Category | null;
//     chapters: { id: string}[];
//     progress: number | null;
// };

// type GetCourses {
//     userId: string,
//     title?: string,
//     categoryId?: string
// }


// export const getCourses = async ({
//     userId,
//     title,
//     categoryId,
// }: GetCourses):Promise<CourseWithProgressWithCategory> => {
//     try {

//     } catch (error) {
//         console.log("[GET_COURSES]", error);
//         return [];
//     }
// }