import { ICatalogRepository } from "../../interface/catalogRepository.interface"
import { Product } from "../../models/product.model"
import { MockCatalogRepository } from "../../repository/mockCatalog.repository"
import { CatalogService } from "../catalog.service"
import { faker } from "@faker-js/faker"

const mockProduct = (rest: any) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min: 0, max: 100 }),
        ...rest
    }
}

describe("CatalogService", () => {
    let repository: ICatalogRepository

    beforeEach(() => {
        repository = new MockCatalogRepository()
    })

    afterEach(() => {
        repository = {} as MockCatalogRepository
    })

    describe("createProduct", () => {
        test("should create product", async () => {
            const service = new CatalogService(repository)
            const reqBody = mockProduct({
                price: +faker.commerce.price()
            })

            const result = await service.createProduct(reqBody)

            expect(result).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number)
            })
        })

        test("should throw error when unable to create product", async () => {
            const service = new CatalogService(repository)
            const reqBody = mockProduct({
                price: +faker.commerce.price()
            })

            jest.spyOn(repository, "create").mockImplementationOnce(() => Promise.resolve({} as Product))

            await expect(service.createProduct(reqBody)).rejects.toThrow("unable to create product")
        })

        test("should throw error when product already exists", async () => {
            const service = new CatalogService(repository)
            const reqBody = mockProduct({
                price: +faker.commerce.price()
            })

            jest.spyOn(repository, "create").mockImplementationOnce(() => Promise.reject(new Error("product already exists")))

            await expect(service.createProduct(reqBody)).rejects.toThrow("product already exists")
        })
    })


})