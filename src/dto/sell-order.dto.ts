import { ApiProperty } from '@nestjs/swagger';

export class SellOrderDto {

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    price: number;

}
