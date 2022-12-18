import { setActivePinia, createPinia } from 'pinia';
import useUserStore from './stores/user';
import { describe, test, vi, beforeEach } from 'vitest';

vi.mock('@/includes/firebase', () => ({
    default: () => ({
        get: vi.fn(),
        post: vi.fn()
    }),
    onAuthStateChanged: () => ({
        get: vi.fn(),
        post: vi.fn()
    })
}))

describe('stores', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test('authenticate user', async () => {
        const store = useUserStore()
    })
})