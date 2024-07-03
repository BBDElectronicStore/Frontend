export interface Order {
    order_id: number,
    persona_id: string,
    quantity: number,
    status_name: string,
    total_cost: number
}

// type OrderStatus = 'placed' | 'pending' | 'approved' | 'denied' | 'cancelled' | 'collected';
