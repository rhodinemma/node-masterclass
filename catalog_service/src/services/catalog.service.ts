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

    updateProduct(input: any) { }

    getProducts(limit: number, offset: number) { }

    getProduct(id: number) { }

    deleteProduct(id: number) { }
}