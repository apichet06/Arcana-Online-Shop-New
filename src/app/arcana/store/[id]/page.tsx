type Props = {
    params: Promise<{
        id: string
    }>
}

export async function generateStaticParams() {
    return [
        { id: "1" },
        { id: "2" },
        { id: "3" },
    ]
}

export default async function Page({ params }: Props) {
    const { id } = await params

    return (
        <div>Store ID: {id}</div>
    )
}