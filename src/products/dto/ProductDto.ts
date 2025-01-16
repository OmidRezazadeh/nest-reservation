import {  Expose,Exclude } from 'class-transformer';
@Exclude()
export class ProductDto{
    @Expose()
    id:number;
    @Expose()
    title:string
    @Expose()
    description:string
    @Expose()
    price:number
    @Expose({ name: 'user' })
    user_id: number;
}