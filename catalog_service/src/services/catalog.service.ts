import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalogService {

    private _repository: ICatalogRepository;

    constructor(repository: ICatalogRepository) {
        this._repository = repository;
    }

    async createProduct(input: any) {
        const data = await this._repository.create(input);

        if (!data.id) {
            throw new Error("unable to create product")
        }

        return data;
    }

    async updateProduct(input: any) {
        const data = await this._repository.update(input);

        if (!data.id) {
            throw new Error("unable to update product")
        }

        // emit event to update record in Elastic search
        return data;
    }

    // instead of this we will get product from Elastic Search
    async getProducts(limit: number, offset: number) {
        const products = await this._repository.find(limit, offset);

        if (!products.length) {
            throw new Error("failed to get products")
        }

        return products;
    }

    async getProduct(id: number) {
        const product = await this._repository.findOne(id);

        if (!product) {
            throw new Error("failed to get product")
        }

        return product;
    }

    async deleteProduct(id: number) {
        const result = await this._repository.delete(id);
        // delete record from Elastic Search
        return result;
    }
}