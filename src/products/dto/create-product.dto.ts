export enum ProductStatus {
    AVAILABLE = 'AVAILABLE',
    SOLDOUT = 'SOLD OUT'
}

export class CreateProductDto {
    name: string;
    description?: string;
    stock: number;
    pStatus: ProductStatus;
}
