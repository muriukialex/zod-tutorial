// CODE

import { expect, it } from 'vitest';
import { z } from 'zod';

const StarWarsPerson = z.object({
    name: z.string(),
});

const StarWarsPeopleResults = z.object({
    results: z.array(StarWarsPerson),
});

const logStarWarsPeopleResults = (
    data: z.infer<typeof StarWarsPeopleResults>
) => {
    //  ^ 🕵️‍♂️
    return data;
};

const apiSimulation = async (): Promise<
    z.infer<typeof StarWarsPeopleResults>
> => {
    return new Promise((resolve, reject) => {
        const data = {
            results: [
                {
                    name: 'John',
                },
                {
                    name: 'Jane',
                },
            ],
        };
        resolve(logStarWarsPeopleResults(data));
        reject(new Error('Something wrong happened!'));
    });
};

it.concurrent(
    'should return the results array',
    async () => {
        const response = await apiSimulation();

        expect(response.results[0]).toEqual({
            name: 'John',
        });
    },
    5000
);
