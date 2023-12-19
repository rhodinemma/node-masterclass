import express, { NextFunction, Request, Response } from "express";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest } from "../dto/product.dto";

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

// endpoints
router.post("/products", async (req: Request, res: Response, next: NextFunction) => {
    const { errors, input } = await RequestValidator(CreateProductRequest, req.body);

    if (errors) return res.status(400).json(errors);

    const data = await catalogService.createProduct(input);

    return res.status(201).json(data);
})

export default router;