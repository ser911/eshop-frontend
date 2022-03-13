import { Product } from "./product";

export class Variant {
    id?: string;
    product?: Product;
    color?: number;
    size?: string;
    inventory?:number;
    image?: string;
    images?: string[];
}