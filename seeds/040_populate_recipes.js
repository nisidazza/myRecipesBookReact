exports.seed = knex =>

    knex('recipes').insert([
        {
            id: 1,
            title: 'Pancakes',
            category: 'sweet',
            is_complete: true,
            notes: 'delicious!',
            link: 'https://www.allrecipes.com/recipe/45396/easy-pancakes/',
            user_id: 1,
            is_public: true
        },
        {
            id: 2,
            title: 'Mushroom Risotto',
            category: 'savoury',
            is_complete: true,
            notes: 'add butter at the end and stir',
            link: 'https://www.delish.com/cooking/recipe-ideas/recipes/a55215/easy-mushroom-risotto-recipe/',
            user_id: 1,
            is_public: false
        },
        {
            id: 3,
            title: 'Pork Dumplings',
            category: 'savoury',
            is_complete: true,
            notes: 'add prawns',
            link: 'https://www.thekitchn.com/how-to-make-pork-dumplings-cooking-lessons-from-the-kitchn-216163',
            user_id: 1,
            is_public: false
        },
        {
            id: 4,
            title: 'Scrambled eggs',
            category: 'savoury',
            is_complete: true,
            notes: '',
            link: 'https://www.incredibleegg.org/recipe/basic-scrambled-eggs/',
            user_id: 1,
            is_public: true
        },
        {
            id: 5,
            title: 'Brownie',
            category: 'sweet',
            is_complete: true,
            notes: 'add chocolate drops',
            link: 'https://www.chelsea.co.nz/browse-recipes/best-brownie/',
            user_id: 1,
            is_public: true
        },
        {
            id: 6,
            title: 'Pizza',
            category: 'savoury',
            is_complete: true,
            notes: '',
            link: 'https://www.simplyrecipes.com/recipes/homemade_pizza/',
            user_id: 1,
            is_public:true
        },
    ]).then(() => {
        knex.raw('SELECT setval("ingredients_id_seq", (SELECT MAX(id) from "test"))')
    })