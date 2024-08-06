import { db } from '@/lib/db'
import Categories from './_components/categories'
import SearchInput from '@/components/search-input';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getCourses } from '@/actions/get-courses';
import CoursesList from '@/components/courses-list';


interface SearchPageProps {
  searchParams: {
    //categoryId: string;
    title: string;
  }
}
const SearchPage = async ({searchParams}:SearchPageProps) => {

  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })

  return (
      <>
        <div className='md:hidden md:mb-0 block pt-2 px-6'>
          <SearchInput/>
        </div>
          <div className="p-6 space-y-3">
              <Categories items={categories} />
              <CoursesList items={courses} />
          </div>
      </>
  );
}

export default SearchPage