/**
 * Express dependencies 
 */ 
import { Router } from "express";

export default abstract class Routers {
    protected router = Router();
    public init() {}
}