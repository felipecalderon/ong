import { postService } from '@/services/post.service'
import { PostModel } from '@/database/models/post.model'
import { connectToMongoDB } from '@/database/mongo'
import { Post } from '@/interfaces/post.interface'

// Mockeamos las dependencias externas (base de datos)
jest.mock('@/database/mongo', () => ({
    connectToMongoDB: jest.fn(),
}))

jest.mock('@/database/models/post.model')

describe('Post Service', () => {
    afterEach(() => {
        jest.clearAllMocks() // Limpiamos los mocks después de cada prueba
    })

    it('should create a new post', async () => {
        const mockPostData = {
            title: 'Test Title',
            content: 'Test Content',
            user: 'test-user-id',
        } as Post

        // Configuramos el mock para que la función `create` del modelo devuelva el post creado
        const mockedCreate = PostModel.create as jest.Mock
        mockedCreate.mockResolvedValue(mockPostData)

        const result = await postService.create(mockPostData)

        // Verificamos que la conexión a la DB fue llamada
        expect(connectToMongoDB).toHaveBeenCalledTimes(1)

        // Verificamos que el método create del modelo fue llamado con los datos correctos
        expect(PostModel.create).toHaveBeenCalledWith(mockPostData)

        // Verificamos que el servicio devuelve el post creado
        expect(result).toEqual(mockPostData)
    })

    it('should get all posts', async () => {
        const mockPosts = [
            { title: 'Post 1', content: 'Content 1' },
            { title: 'Post 2', content: 'Content 2' },
        ]

        // Configuramos el mock para que la función `find` del modelo devuelva nuestra lista de posts
        const mockedFind = PostModel.find as jest.Mock
        mockedFind.mockResolvedValue(mockPosts)

        const result = await postService.getAll()

        expect(connectToMongoDB).toHaveBeenCalledTimes(1)
        expect(PostModel.find).toHaveBeenCalledTimes(1)
        expect(result).toEqual(mockPosts)
    })
})
