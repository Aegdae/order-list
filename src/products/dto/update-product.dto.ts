import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto, ProductStatus } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    name: string;
    description?: string;
    stock: number; 
    pStatus: ProductStatus;
}
