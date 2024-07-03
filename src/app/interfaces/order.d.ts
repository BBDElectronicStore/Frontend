export interface Order {
    orderId: number,
    customerId: number,
    quantity: number,
    status: OrderStatus,
    totalCost: number
}

type OrderStatus = 'places' | 'pending' | 'approved' | 'complete' | 'denied' | 'cancelled';
