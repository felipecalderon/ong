import AuthButton from '@/components/auth/button'

export default function Navbar() {
    return (
        <nav className='w-full flex justify-between items-center p-4 bg-white shadow-md'>
            <h1 className='text-xl font-semibold'>Mi App</h1>
            <AuthButton />
        </nav>
    )
}
