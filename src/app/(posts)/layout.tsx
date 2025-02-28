export default function Postayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <section className='max-w-2xl mx-auto py-5'>{children}</section>
}
