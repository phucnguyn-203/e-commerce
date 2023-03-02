export default function PageLayout({
    title,
    children,
}: {
    title: string;
    children: JSX.Element;
}): JSX.Element {
    return (
        <div className="px-6 h-full overflow-auto">
            <h1 className="my-6 text-lg font-bold dark:text-textPrimary">
                {title}
            </h1>
            {children}
        </div>
    );
}
