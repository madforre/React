export default function Layout( props: Readonly<{ children: React.ReactNode; }> ) {
    return (
        <>
        <form action="">
            <h2>Create</h2>
            {props.children}
        </form>
        </>
    )
}