export enum ProductStatus {
    AVAILABLE = 'AVAILABLE',
    SOLDOUT = 'SOLD OUT'
}

export class CreateProductDto {
    name: string;
    description?: string;
    quantity: number;
    pStatus: ProductStatus;
}
