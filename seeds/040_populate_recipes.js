exports.seed = async knex => {

    await knex('recipes').insert([
        {
            id: 1,
            title: 'Pancakes',
            category: 'breakfast',
            is_complete: true,
            notes: 'delicious!',
            link: 'https://www.allrecipes.com/recipe/45396/easy-pancakes/',
            user_id: 1,
            is_public: true,
            img_url: "https://res.cloudinary.com/hqwayz2au/image/upload/v1583797872/ml2rmpczpler3i6qapcn.jpg"
        },
        {
            id: 2,
            title: 'Mushroom Risotto',
            category: 'savoury',
            is_complete: true,
            notes: 'add butter at the end and stir',
            link: 'https://www.delish.com/cooking/recipe-ideas/recipes/a55215/easy-mushroom-risotto-recipe/',
            user_id: 2,
            is_public: false,
            img_url: "https://res.cloudinary.com/hqwayz2au/image/upload/v1583877492/zrjmfympjnvmaojdr5uh.jpg"
        },
        {
            id: 3,
            title: 'Pork Dumplings',
            category: 'savoury',
            is_complete: true,
            notes: 'add prawns',
            link: 'https://www.thekitchn.com/how-to-make-pork-dumplings-cooking-lessons-from-the-kitchn-216163',
            user_id: 1,
            is_public: false,
            img_url: "https://res.cloudinary.com/hqwayz2au/image/upload/v1583878511/t5oszia34emmqidb8zhc.jpg"
        },
        {
            id: 4,
            title: 'Scrambled eggs',
            category: 'savoury',
            is_complete: true,
            notes: '',
            link: 'https://www.incredibleegg.org/recipe/basic-scrambled-eggs/',
            user_id: 1,
            is_public: true,
            img_url: "https://res.cloudinary.com/hqwayz2au/image/upload/v1583878178/rdocc0autdsbyyfnjr6u.jpg"
        },
        {
            id: 5,
            title: 'Brownie',
            category: 'dessert',
            is_complete: true,
            notes: 'add chocolate drops',
            link: 'https://www.chelsea.co.nz/browse-recipes/best-brownie/',
            user_id: 2,
            is_public: true,
            img_url: "https://res.cloudinary.com/hqwayz2au/image/upload/v1583874596/susn6kjl9kpprumfh9zs.jpg"
        },
        {
            id: 6,
            title: 'Pizza',
            category: 'savoury',
            is_complete: true,
            notes: '',
            link: 'https://www.simplyrecipes.com/recipes/homemade_pizza/',
            user_id: 1,
            is_public: false,
            img_url: "https://res.cloudinary.com/hqwayz2au/image/upload/v1583828747/labgifgndooppbiwg4li.jpg"
        },
        {
            id: 7,
            title: 'Bacon and Cheese Quiche',
            category: 'savoury',
            is_complete: true,
            notes: 'add zucchini',
            link: 'https://www.pillsbury.com/recipes/bacon-and-cheese-quiche/19288cf4-0cdc-46cc-bc86-4c9bfa799695',
            user_id: 1,
            is_public: true,
            img_url: "https://res.cloudinary.com/hqwayz2au/image/upload/v1583798028/enr9binod1bpmao849qf.jpg"
        },
        {
            id: 8,
            title: 'Caesar Salad',
            category: 'salad',
            is_complete: true,
            notes: 'add zucchini',
            link: 'https://www.pillsbury.com/recipes/bacon-and-cheese-quiche/19288cf4-0cdc-46cc-bc86-4c9bfa799695',
            user_id: 1,
            is_public: false,
            img_url: "https://res.cloudinary.com/hqwayz2au/image/upload/v1583878647/kwe441rsmrdetobj0ezc.jpg"
        },
        {
            id: 9,
            title: 'Classic Ragu Bolognese',
            category: 'main',
            is_complete: true,
            notes: 'add some chilli and italian herbs',
            link: 'https://www.epicurious.com/recipes/food/views/classic-ragu-bolognese-365181',
            user_id: 2,
            is_public: false,
            img_url: "http://res.cloudinary.com/hqwayz2au/image/upload/v1584246138/av7cofu0ak55gobwe9sw.jpg"
        },
        {
            id: 10,
            title: 'Baked Potatoes',
            category: 'sides',
            is_complete: false,
            notes: 'add some garlic',
            link: 'https://www.allrecipes.com/recipe/54679/perfect-baked-potato/',
            user_id: 2,
            is_public: false,
            img_url: "https://res.cloudinary.com/hqwayz2au/image/upload/v1583874714/j8dum8jn0pro8jvaodsk.jpg"
        },


    ])
    await knex.raw("SELECT setval('recipes_id_seq', (SELECT MAX(id) from recipes))")
}