interface SkeletonProps {
    content?: string | undefined | null;
}

const Skeleton = ({ content }: SkeletonProps) => {
    return content == undefined || null ? (
        <div className='h-4 bg-zinc-300 rounded-md  animate-pulse w-full mb-4 '></div>
    ) : (
        <p>{content}</p>
    );
};

export default Skeleton;
