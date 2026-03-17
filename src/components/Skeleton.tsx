import { Skeleton as MotiSkeleton } from "moti/skeleton";
import React, { ComponentProps } from "react";

type MotiSkeletonProps = ComponentProps<typeof MotiSkeleton>;

interface SkeletonProps extends Partial<MotiSkeletonProps> {
    children?: React.ReactElement | null | undefined;
    isLoading?: boolean;
}

export default function Skeleton({ children, ...props }: SkeletonProps) {
    return (
        <MotiSkeleton
            colorMode="light"
            colors={["#FFFFFF", "#e6ebf2f3", "#FFFFFF"]}
            {...props}
        >
            {children}
        </MotiSkeleton>
    )
}
