import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RegisterPage from '@/app/register/page'
import { registerUser } from '@/actions/user.action'
import '@testing-library/jest-dom'

// Mock de la Server Action
jest.mock('@/actions/user.action', () => ({
    registerUser: jest.fn(),
}))

// Mock del useRouter de Next.js
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    useSearchParams: () => ({
        get: jest.fn(),
    }),
}))

describe('Register Page Integration Test', () => {
    beforeEach(() => {
        // Limpiamos los mocks antes de cada prueba
        jest.clearAllMocks()
    })

    it('should allow a user to register successfully', async () => {
        // 1. Arrange: Configuramos el mock de la Server Action para que simule un registro exitoso
        (registerUser as jest.Mock).mockResolvedValue({ success: true })

        // Renderizamos el componente de la página de registro
        render(<RegisterPage />)

        // 2. Act: Simulamos la interacción del usuario
        // Rellenamos los campos del formulario
        fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'John Doe' } })
        fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'john.doe@example.com' } })
        fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } })

        // Hacemos clic en el botón de registro
        fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }))

        // 3. Assert: Verificamos el comportamiento esperado
        // Esperamos a que la Server Action sea llamada
        await waitFor(() => {
            expect(registerUser).toHaveBeenCalledTimes(1)
            expect(registerUser).toHaveBeenCalledWith({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                image: '',
            })
        })

        // Verificamos que el usuario es redirigido a la página de login
        const { push } = require('next/navigation').useRouter()
        expect(push).toHaveBeenCalledWith('/login')
    })

    it('should display an error message if registration fails', async () => {
        // 1. Arrange: Configuramos el mock de la Server Action para que simule un fallo
        (registerUser as jest.Mock).mockRejectedValue(new Error('El correo electrónico ya está en uso.'))

        render(<RegisterPage />)

        // 2. Act: Rellenamos el formulario y enviamos
        fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Jane Doe' } })
        fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'jane.doe@example.com' } })
        fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } })
        fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }))

        // 3. Assert: Verificamos que se muestra el mensaje de error
        await waitFor(() => {
            expect(screen.getByText(/El correo electrónico ya está en uso./i)).toBeInTheDocument()
        })

        // Verificamos que no hay redirección
        const { push } = require('next/navigation').useRouter()
        expect(push).not.toHaveBeenCalled()
    })
})
