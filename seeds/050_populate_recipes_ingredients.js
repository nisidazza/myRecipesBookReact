exports.seed = async knex => {
    await knex('recipes_ingredients').insert([
        {
            recipe_id: 1,
            ingredient_id: 1,
            quantity: '1 cup'
        },
        {
            recipe_id: 1,
            ingredient_id: 2,
            quantity: '2 tablespoons'
        },
        {
            recipe_id: 1,
            ingredient_id: 3,
            quantity: '2 tablespoons'
        },
        {
            recipe_id: 1,
            ingredient_id: 4,
            quantity: '1 tablespoon'
        },
        {
            recipe_id: 1,
            ingredient_id: 5,
            quantity: '1'
        },
        {
            recipe_id: 1,
            ingredient_id: 6,
            quantity: '1 cup'
        },
        {
            recipe_id: 1,
            ingredient_id: 7,
            quantity: '2 tablespoons'
        },
        {
            recipe_id: 2,
            ingredient_id: 8,
            quantity: '1 cup'
        },
        {
            recipe_id: 2,
            ingredient_id: 7,
            quantity: '1 tablespoon'
        },
        {
            recipe_id: 2,
            ingredient_id: 9,
            quantity: '1'
        },
        {
            recipe_id: 2,
            ingredient_id: 10,
            quantity: '1/8 cup'
        },
        {
            recipe_id: 2,
            ingredient_id: 11,
            quantity: '2'
        },
        {
            recipe_id: 2,
            ingredient_id: 12,
            quantity: '3'
        },
        {
            recipe_id: 2,
            ingredient_id: 13,
            quantity: '2 tablespoons'
        },
        {
            recipe_id: 2,
            ingredient_id: 4,
            quantity: 'q.s'
        },
        {
            recipe_id: 2,
            ingredient_id: 14,
            quantity: '5/8 cup'
        },
        {
            recipe_id: 2,
            ingredient_id: 15,
            quantity: 'q.s'
        },
        {
            recipe_id: 2,
            ingredient_id: 16,
            quantity: '1/8 cup'
        },
        {
            recipe_id: 2,
            ingredient_id: 17,
            quantity: 'q.s'
        },
        {
            recipe_id: 3,
            ingredient_id: 25,
            quantity: '1/2'
        },
        {
            recipe_id: 3,
            ingredient_id: 4,
            quantity: '1 tablespoon'
        },
        {
            recipe_id: 3,
            ingredient_id: 26,
            quantity: '300gr'
        },
        {
            recipe_id: 3,
            ingredient_id: 27,
            quantity: 'q.s'
        },
        {
            recipe_id: 3,
            ingredient_id: 28,
            quantity: 'q.s'
        },
        {
            recipe_id: 3,
            ingredient_id: 29,
            quantity: '3 tablespoons'
        },
        {
            recipe_id: 3,
            ingredient_id: 30,
            quantity: '2 tablespoons'
        },
        {
            recipe_id: 3,
            ingredient_id: 5,
            quantity: '2'
        },
        {
            recipe_id: 3,
            ingredient_id: 31,
            quantity: '1 package'
        },
        {
            recipe_id: 4,
            ingredient_id: 5,
            quantity: '4'
        },
        {
            recipe_id: 4,
            ingredient_id: 6,
            quantity: '1/4 cup'
        },
        {
            recipe_id: 4,
            ingredient_id: 10,
            quantity: '2 tablespoons'
        },
        {
            recipe_id: 4,
            ingredient_id: 4,
            quantity: 'q.s'
        },
        {
            recipe_id: 4,
            ingredient_id: 17,
            quantity: 'q.s'
        },
        {
            recipe_id: 5,
            ingredient_id: 10,
            quantity: '200gr'
        },
        {
            recipe_id: 5,
            ingredient_id: 32,
            quantity: '3/4 cup'
        },
        {
            recipe_id: 5,
            ingredient_id: 2,
            quantity: '2 cups'
        },
        {
            recipe_id: 5,
            ingredient_id: 33,
            quantity: '1 tablespoon'
        },
        {
            recipe_id: 5,
            ingredient_id: 1,
            quantity: '3/4 cup'
        },
        {
            recipe_id: 5,
            ingredient_id: 3,
            quantity: '1 tablespoon'
        },
        {
            recipe_id: 6,
            ingredient_id: 24,
            quantity: '250ml'
        },
        {
            recipe_id: 6,
            ingredient_id: 18,
            quantity: '5gr'
        },
        {
            recipe_id: 6,
            ingredient_id: 1,
            quantity: '350gr'
        },
        {
            recipe_id: 6,
            ingredient_id: 4,
            quantity: '25gr'
        },
        {
            recipe_id: 6,
            ingredient_id: 2,
            quantity: '1 teaspoon sugar'
        },
        {
            recipe_id: 6,
            ingredient_id: 7,
            quantity: '1 tablespoon'
        },
        {
            recipe_id: 6,
            ingredient_id: 21,
            quantity: '500gr'
        },
        {
            recipe_id: 6,
            ingredient_id: 20,
            quantity: '100gr'
        },
        {
            recipe_id: 6,
            ingredient_id: 12,
            quantity: '2'
        },
        {
            recipe_id: 6,
            ingredient_id: 34,
            quantity: 'q.s'
        },
        {
            recipe_id: 6,
            ingredient_id: 23,
            quantity: 'q.s'
        },
        {
            recipe_id: 7,
            ingredient_id: 35,
            quantity: '1'
        },
        {
            recipe_id: 7,
            ingredient_id: 6,
            quantity: '250ml'
        },
        {
            recipe_id: 7,
            ingredient_id: 5,
            quantity: '4'
        },
        {
            recipe_id: 7,
            ingredient_id: 4,
            quantity: '1/4 teaspoon'
        },
        {
            recipe_id: 7,
            ingredient_id: 17,
            quantity: '1/4 teaspoon'
        },
        {
            recipe_id: 7,
            ingredient_id: 36,
            quantity: '8'
        },
        {
            recipe_id: 7,
            ingredient_id: 37,
            quantity: '1 cup'
        },
        {
            recipe_id: 7,
            ingredient_id: 16,
            quantity: '1/4 cup'
        },
        {
            recipe_id: 7,
            ingredient_id: 9,
            quantity: '1/4'
        },
        {
            recipe_id: 8,
            ingredient_id: 7,
            quantity: '1/2 cup'
        },
        {
            recipe_id: 8,
            ingredient_id: 11,
            quantity: '4'
        },
        {
            recipe_id: 8,
            ingredient_id: 38,
            quantity: '1'
        },
        {
            recipe_id: 8,
            ingredient_id: 39,
            quantity: '1/4'
        },
        {
            recipe_id: 8,
            ingredient_id: 16,
            quantity: '1 tablespoon'
        },
        {
            recipe_id: 8,
            ingredient_id: 5,
            quantity: '2'
        },
        {
            recipe_id: 8,
            ingredient_id: 17,
            quantity: '1/4 teaspoon'
        },
        {
            recipe_id: 8,
            ingredient_id: 4,
            quantity: '1/2 teaspoon'
        },
        {
            recipe_id: 8,
            ingredient_id: 40,
            quantity: '4-6 small heads'
        },
        {
            recipe_id: 8,
            ingredient_id: 41,
            quantity: 'q.s'
        },
        {
            recipe_id: 9,
            ingredient_id: 7,
            quantity: '2 tablespoon'
        },
        {
            recipe_id: 9,
            ingredient_id: 42,
            quantity: '2'
        },
        {
            recipe_id: 9,
            ingredient_id: 43,
            quantity: '2'
        },
        {
            recipe_id: 9,
            ingredient_id: 44,
            quantity: '2'
        },
        {
            recipe_id: 9,
            ingredient_id: 45,
            quantity: '500gr'
        },
        {
            recipe_id: 9,
            ingredient_id: 46,
            quantity: '500gr'
        },
        {
            recipe_id: 9,
            ingredient_id: 47,
            quantity: '1/2 cup'
        },
        {
            recipe_id: 9,
            ingredient_id: 48,
            quantity: '3 cups'
        },
        {
            recipe_id: 9,
            ingredient_id: 19,
            quantity: '1 cup'
        },
        {
            recipe_id: 9,
            ingredient_id: 4,
            quantity: 'q.s'
        },
        {
            recipe_id: 9,
            ingredient_id: 17,
            quantity: 'q.s'
        },
        {
            recipe_id: 9,
            ingredient_id: 6,
            quantity: '1 cup'
        },
        {
            recipe_id: 9,
            ingredient_id: 16,
            quantity: 'q.s'
        },
        {
            recipe_id: 9,
            ingredient_id: 49,
            quantity: '80gr PP'
        },
        {
            recipe_id: 10,
            ingredient_id: 50,
            quantity: '1 medium'
        },
        {
            recipe_id: 10,
            ingredient_id: 7,
            quantity: '1 teaspoon'
        },
        {
            recipe_id: 10,
            ingredient_id: 4,
            quantity: '1/2 teaspoon'
        },
        {
            recipe_id: 10,
            ingredient_id: 10,
            quantity: '2 teaspoons'
        },
        {
            recipe_id: 10,
            ingredient_id: 17,
            quantity: '1 pinch freshly ground'
        },
        {
            recipe_id: 10,
            ingredient_id: 37,
            quantity: '1/4 cup'
        },
        {
            recipe_id: 11,
            ingredient_id: 14,
            quantity: '1½ cups'
        },
        {
            recipe_id: 11,
            ingredient_id: 28,
            quantity: '1 tablespoon'
        },
        {
            recipe_id: 11,
            ingredient_id: 10,
            quantity: '1 knob'
        },
        {
            recipe_id: 11,
            ingredient_id: 54,
            quantity: '1 tablespoon'
        },
        {
            recipe_id: 11,
            ingredient_id: 55,
            quantity: '4 fillets'
        },
        {
            recipe_id: 11,
            ingredient_id: 56,
            quantity: '1 tablespoon'
        },
        {
            recipe_id: 11,
            ingredient_id: 57,
            quantity: '1'
        },
        {
            recipe_id: 11,
            ingredient_id: 58,
            quantity: '1 piece'
        },
        {
            recipe_id: 11,
            ingredient_id: 59,
            quantity: '4 bunches'
        },
        {
            recipe_id: 11,
            ingredient_id: 30,
            quantity: '1 dash'
        },
        {
            recipe_id: 12,
            ingredient_id: 46,
            quantity: '455 gr'
        },
        {
            recipe_id: 12,
            ingredient_id: 45,
            quantity: '225 gr'
        },
        {
            recipe_id: 12,
            ingredient_id: 26,
            quantity: '225 gr'
        },
        {
            recipe_id: 12,
            ingredient_id: 13,
            quantity: '50 gr'
        },
        {
            recipe_id: 12,
            ingredient_id: 11,
            quantity: '2 - minced'
        },
        {
            recipe_id: 12,
            ingredient_id: 7,
            quantity: '2 tablespoons'
        },
        {
            recipe_id: 12,
            ingredient_id: 6,
            quantity: '2 tablespoons'
        },
        {
            recipe_id: 12,
            ingredient_id: 63,
            quantity: '125gr'
        },
        {
            recipe_id: 12,
            ingredient_id: 16,
            quantity: '3/4 cups'
        },
        {
            recipe_id: 12,
            ingredient_id: 5,
            quantity: '4 - large'
        },
        {
            recipe_id: 12,
            ingredient_id: 4,
            quantity: '2 tablespoons'
        },
        {
            recipe_id: 12,
            ingredient_id: 17,
            quantity: '1 tablespoon'
        },
        {
            recipe_id: 12,
            ingredient_id: 64,
            quantity: '1 teaspoon'
        }
    ])
}