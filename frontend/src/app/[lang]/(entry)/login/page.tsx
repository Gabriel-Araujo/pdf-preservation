export const metadata = {
    title: "Pdf Archive - Login",
    description: "Login page"
}

export default async function Page() {
    const a = await fetch("http://localhost:5000")

    console.log(await a.json())
    return <div>ola login</div>
}