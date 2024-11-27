export interface Product {
    id: string;
    name: string;
    price_per_unit: number;
    category: string;
    description?: string;
    images?: [];
    is_available?: string;
    seller_id: string;
    stock_quantity: number;
    unit: string;
    status: string;
}
