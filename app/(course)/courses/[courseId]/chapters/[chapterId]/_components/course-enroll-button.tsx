import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
    courseId: string;
    price: number;
}

const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
    return (
        <>
            <Button size="sm" className="w-full md:w-auto">
                Enroll for {formatPrice(price)}
            </Button>
        </>
    );
};

export default CourseEnrollButton;
