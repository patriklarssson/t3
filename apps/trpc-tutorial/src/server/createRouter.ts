import { router } from '@trpc/server';
import superJson from "superJson"
import { Context } from './createContext';

export function createRouter() {
    return router<Context>().transformer(superJson)
}
