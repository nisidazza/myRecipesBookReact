exports.seed = async knex => {
    await knex('ingredients').insert([
        {
            id: 1,
            name: 'flour',
        },
        {
            id: 2,
            name: 'sugar',
        },
        {
            id: 3,
            name: 'baking powder',
        },
        {
            id: 4,
            name: 'salt',
        },
        {
            id: 5,
            name: 'eggs',
        },
        {
            id: 6,
            name: 'milk',
        },
        {
            id: 7,
            name: 'extra-vergin olive oil',
        },
        {
            id: 8,
            name: 'chicken or vegetable broth',
        },
        {
            id: 9,
            name: 'onion',
        },
        {
            id: 10,
            name: 'butter',
        },
        {
            id: 11,
            name: 'clove garlic',
        },
        {
            id: 12,
            name: 'mushroom',
        },
        {
            id: 13,
            name: 'parsley',
        },
        {
            id: 14,
            name: 'rice',
        },
        {
            id: 15,
            name: 'white wine',
        },
        {
            id: 16,
            name: 'parmesan cheese',
        },
        {
            id: 17,
            name: 'black pepper',
        },
        {
            id: 18,
            name: 'yeast',
        },
        {
            id: 19,
            name: 'tomato sauce',
        },
        {
            id: 20,
            name: 'ham',
        },
        {
            id: 21,
            name: 'mozzarella',
        },
        {
            id: 22,
            name: 'king prawns',
        },
        {
            id: 23,
            name: 'basil',
        },
        {
            id: 24,
            name: 'water',
        },
        {
            id: 25,
            name: 'cabbage',
        },
        {
            id: 26,
            name: 'pork mince',
        },
        {
            id: 27,
            name: 'spring onion',
        },
        {
            id: 28,
            name: 'soy sauce',
        },
        {
            id: 29,
            name: 'minced ginger',
        },
        {
            id: 30,
            name: 'sesame oil',
        },
        {
            id: 31,
            name: 'dumpling wrappers',
        },
        {
            id: 32,
            name: 'cocoa',
        },
        {
            id: 33,
            name: 'vanilla essence',
        },
        {
            id: 34,
            name: 'oregano',
        },
        {
            id: 35,
            name: 'pie crust'
        },
        {
            id: 36,
            name: 'slices bacon'
        },
        {
            id: 37,
            name: 'Swiss or Cheddar cheese'
        },
        {
            id: 38,
            name: ' baguette'
        },
        {
            id: 39,
            name: 'lemon juice'
        },
        {
            id: 40,
            name: 'romaine lettuce'
        },
        {
            id: 41,
            name: 'croutons'
        },
        {
            id: 42,
            name: 'medium onions'
        },
        {
            id: 43,
            name: 'celery stalks'
        },
        {
            id: 44,
            name: 'carrots'
        },
        {
            id: 45,
            name: 'beef mince'
        },
        {
            id: 46,
            name: 'veal mince'
        },
        {
            id: 47,
            name: 'red wine'
        },
        {
            id: 48,
            name: 'beef or chicken stock'
        },
        {
            id: 49,
            name: 'tagliatelle or fettuccine'
        },
        {
            id: 50,
            name: 'potatoes'
        },
        {
            id: 51,
            name: 'Cheddar cheese'
        },
        {
            id: 52,
            name: 'rosemary'
        },
        {
            id: 53,
            name: 'thyme'
        },
        {
            id: 54,
            name: 'black sesame seeds'
        },
        {
            id: 55,
            name: 'salmon, fresh and pin-boned'
        },
        {
            id: 56,
            name: 'sweet chilli sauce'
        },
        {
            id: 57,
            name: 'lime'
        },
        {
            id: 58,
            name: 'fresh ginger'
        },
        {
            id: 59,
            name: 'bok choy, kai larn, tat soi or similar'
        },
        {
            id: 63,
            name: 'breadcrumbs'
        },
        {
            id: 64,
            name: 'garlic powder'
        }
    ])

    await knex.raw("SELECT setval('ingredients_id_seq', (SELECT MAX(id) from ingredients))")
}