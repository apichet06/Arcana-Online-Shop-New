import { Skeleton } from "@/components/ui/skeleton";

export default function Skeletons() {
    return (
        <div className="flex flex-col items-center space-y-4 w-full">
            <Skeleton className="h-26.25 w-[90%] sm:w-[80%] lg:w-[60%] rounded-xl" />
            <Skeleton className="h-12.5 w-[85%] sm:w-[70%] lg:w-[50%] rounded-xl" />

            <div className="flex flex-col items-center space-y-2 w-full">
                <Skeleton className="h-4 w-[70%] sm:w-[60%]" />
                <Skeleton className="h-4 w-[60%] sm:w-[45%]" />
            </div>
        </div>


    )
}
