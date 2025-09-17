import { create } from 'zustand'

export interface Item {
  id: number
  name: string
  image_url: string
  price: number
  quantity: number
  summary: {
    calories: number
    description: string
  }
}

interface CartState {
  items: Item[]
  addItem: (item: Item) => void
  removeItem: (itemId: number) => Item | undefined
  clearCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [
    {
      id: 1,
      name: 'Reeses King Size',
      image_url: 'https://picsum.photos/id/237/400/400',
      price: 5.0,
      quantity: 1,
      summary: {
        calories: 200,
        description: 'A chocolate cup filled with peanut butter'
      }
    },
    {
      id: 2,
      name: 'Snickers',
      image_url: 'https://picsum.photos/id/237/400/400',
      price: 2.0,
      quantity: 2,
      summary: {
        calories: 200,
        description:
          'a chocolate bar consisting of nougat, peanuts, and caramel, all coated in milk chocolatey'
      }
    },
    {
      id: 3,
      name: 'Sour Skittles',
      image_url: 'https://picsum.photos/id/237/400/400',
      price: 3.0,
      quantity: 3,
      summary: {
        calories: 200,
        description:
          'a tangy twist on the classic Skittles candy, offering a mix of fruity flavors with a sour coating'
      }
    },
    {
      id: 4,
      name: 'Sour Skittles',
      image_url: 'https://picsum.photos/id/237/400/400',
      price: 3.0,
      quantity: 3,
      summary: {
        calories: 200,
        description:
          'a tangy twist on the classic Skittles candy, offering a mix of fruity flavors with a sour coating'
      }
    },
    {
      id: 5,
      name: 'Sour Skittles',
      image_url: 'https://picsum.photos/id/237/400/400',
      price: 3.0,
      quantity: 3,
      summary: {
        calories: 200,
        description:
          'a tangy twist on the classic Skittles candy, offering a mix of fruity flavors with a sour coating'
      }
    }
  ],
  addItem: (newItem) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === newItem.id)
      if (existingItem) {
        // Item exists; increase quantity
        return {
          items: state.items.map((item) =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        }
      } else {
        // New item
        return { items: [...state.items, { ...newItem, quantity: 1 }] }
      }
    }),

  removeItem: (itemId) => {
    const { items } = get()
    const removedItem = items.find((item) => item.id === itemId)
    set({ items: items.filter((item) => item.id !== itemId) })
    return removedItem
  },

  clearCart: () => set({ items: [] })
}))
