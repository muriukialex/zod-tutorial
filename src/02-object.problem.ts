// CODE

import { expect, it } from 'vitest';
import { z } from 'zod';

const PersonResult = z.object({
    name: z.string(),
    height: z.string(),
    mass: z.string(),
    hair_color: z.string(),
    skin_color: z.string(),
    eye_color: z.string(),
    birth_year: z.string(),
    gender: z.string(),
    homeworld: z.string(),
    films: z.array(z.string()),
    species: z.array(z.string()),
    vehicles: z.array(z.string()),
    starships: z.array(z.string()),
    created: z.string(),
    edited: z.string(),
    url: z.string(),
});
//                   ^ 🕵️‍♂️

export const fetchStarWarsPersonName = async (id: string) => {
    const data = await fetch(
        'https://www.totaltypescript.com/swapi/people/' + id + '.json'
    ).then(res => res.json());

    const parsedData = PersonResult.parse(data);
    return parsedData;
};

// TESTS

it.concurrent(
    'Should return the expected person properties',
    async () => {
        expect(await fetchStarWarsPersonName('1')).toMatchObject({
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            homeworld: 'https://swapi.dev/api/planets/1/',
            films: [
                'https://swapi.dev/api/films/1/',
                'https://swapi.dev/api/films/2/',
                'https://swapi.dev/api/films/3/',
                'https://swapi.dev/api/films/6/',
            ],
            species: [],
            vehicles: [
                'https://swapi.dev/api/vehicles/14/',
                'https://swapi.dev/api/vehicles/30/',
            ],
            starships: [
                'https://swapi.dev/api/starships/12/',
                'https://swapi.dev/api/starships/22/',
            ],
            created: '2014-12-09T13:50:51.644000Z',
            edited: '2014-12-20T21:17:56.891000Z',
            url: 'https://swapi.dev/api/people/1/',
        });
        expect(await fetchStarWarsPersonName('2')).toMatchObject({
            name: 'C-3PO',
            height: '167',
            mass: '75',
            hair_color: 'n/a',
            skin_color: 'gold',
            eye_color: 'yellow',
            birth_year: '112BBY',
            gender: 'n/a',
            homeworld: 'https://swapi.dev/api/planets/1/',
            films: [
                'https://swapi.dev/api/films/1/',
                'https://swapi.dev/api/films/2/',
                'https://swapi.dev/api/films/3/',
                'https://swapi.dev/api/films/4/',
                'https://swapi.dev/api/films/5/',
                'https://swapi.dev/api/films/6/',
            ],
            species: ['https://swapi.dev/api/species/2/'],
            vehicles: [],
            starships: [],
            created: '2014-12-10T15:10:51.357000Z',
            edited: '2014-12-20T21:17:50.309000Z',
            url: 'https://swapi.dev/api/people/2/',
        });
    },
    10000 // increased the timeout at this point to wait for the response
);

it('Should not return undefined for first person', async () => {
    expect(await fetchStarWarsPersonName('1')).not.toEqual(undefined);
});
