import express from 'express';
import Singleton from './utils/singleton';

@Singleton
export default class ExpressApi {
	api = express();
}