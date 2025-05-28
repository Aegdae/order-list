export enum StatusType {
    RECEIVED = 'RECEIVED',
    PREPARING = 'PREPARING',
    SENT = 'SENT',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED'
}

export class CreateOrderDto {
    
    userId: string;
    productId: string;
    quantity: number;
    orderStatus: StatusType;

}
