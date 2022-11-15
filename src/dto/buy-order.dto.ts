import { ApiProperty } from '@nestjs/swagger';

export class BuyOrderDto {

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    price: number;

}
