export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="h-full items-center justify-center flex">{children}</div>;
}
