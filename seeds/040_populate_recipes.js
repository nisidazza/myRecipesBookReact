exports.seed = async (knex) => {
  await knex("recipes").insert([
    {
      id: 1,
      title: "Pancakes",
      category: "breakfast",
      is_complete: true,
      notes: "delicious!",
      link: "https://www.allrecipes.com/recipe/45396/easy-pancakes/",
      user_id: 1,
      is_public: true,
      img_url:
        "https://res.cloudinary.com/hqwayz2au/image/upload/v1583797872/ml2rmpczpler3i6qapcn.jpg",
      instructions:
        "1) In a large bowl, mix flour, sugar, baking powder and salt. Make a well in the center, and pour in milk, egg and oil. Mix until smooth. 2) Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.",
    },
    {
      id: 2,
      title: "Mushroom Risotto",
      category: "savoury",
      is_complete: true,
      notes: "add butter at the end and stir",
      link:
        "https://www.delish.com/cooking/recipe-ideas/recipes/a55215/easy-mushroom-risotto-recipe/",
      user_id: 2,
      is_public: false,
      img_url:
        "https://res.cloudinary.com/hqwayz2au/image/upload/v1583877492/zrjmfympjnvmaojdr5uh.jpg",
      instructions:
        "1) In a medium saucepan over medium heat, bring chicken broth to a simmer. Reduce heat to low. 2) In a large pot or Dutch oven, heat oil. Add onion and cook, stirring often, until translucent, about 5 minutes. Add 1 tablespoon butter, garlic, mushrooms, bay leaf and thyme. Cook until the mushrooms have softened and are golden, about 4 more minutes, then season with salt and pepper. Remove mixture from the pot. 3) Melt remaining tablespoon butter in the pot and add the arborio rice, stirring quickly. Cook until the grains are well-coated and smell slightly toasty, about 2 minutes. Add the wine and cook until the wine has mostly absorbed. 4) With a ladle, add about 1 cup hot broth. Stirring often, cook until the rice has mostly absorbed liquid. Add remaining broth about 1 cup at a time, continuing to allow the rice to absorb each addition of broth before adding more. Stir often and cook until the risotto is al dente and creamy, not mushy. (You might not need all the broth.) 5) Add the mushroom mixture back into the rice. 6) Stir in Parmesan and peas then garnish with parsley. Serve warm.",
    },
    {
      id: 3,
      title: "Pork Dumplings",
      category: "savoury",
      is_complete: true,
      notes: "add prawns",
      link: "https://www.allrecipes.com/recipe/14759/pork-dumplings/",
      user_id: 1,
      is_public: false,
      img_url:
        "https://res.cloudinary.com/hqwayz2au/image/upload/v1583878511/t5oszia34emmqidb8zhc.jpg",
      instructions:
        "1) In a large bowl, combine the pork, ginger, garlic, green onion, soy sauce, sesame oil, egg and cabbage. Stir until well mixed. 2)Place 1 heaping teaspoon of pork filling onto each wonton skin. Moisten edges with water and fold edges over to form a triangle shape. Roll edges slightly to seal in filling. Set dumplings aside on a lightly floured surface until ready to cook. 3)To Cook: Steam dumplings in a covered bamboo or metal steamer for about 15 to 20 minutes. Serve immediately.",
    },
    {
      id: 4,
      title: "Scrambled eggs",
      category: "savoury",
      is_complete: true,
      notes: "",
      link: "https://www.incredibleegg.org/recipe/basic-scrambled-eggs/",
      user_id: 1,
      is_public: true,
      img_url:
        "https://res.cloudinary.com/hqwayz2au/image/upload/v1583878178/rdocc0autdsbyyfnjr6u.jpg",
      instructions:
        "1) Beat eggs, milk, salt and pepper in medium bowl until blended. 2) Heat butter in large nonstick skillet over medium heat until hot. Pour in egg mixture. As eggs begin to set, gently pull the eggs across the pan with a spatula, forming large soft curds. 3) Continue cooking—pulling, lifting and folding eggs—until thickened and no visible liquid egg remains. Do not stir constantly. Remove from heat. Serve immediately.",
    },
    {
      id: 5,
      title: "Brownie",
      category: "dessert",
      is_complete: true,
      notes: "add chocolate drops",
      link: "https://www.chelsea.co.nz/browse-recipes/chocolate-brownie/",
      user_id: 2,
      is_public: true,
      img_url:
        "https://res.cloudinary.com/hqwayz2au/image/upload/v1583874596/susn6kjl9kpprumfh9zs.jpg",
      instructions:
        "1) Preheat oven to 180°C. Line an 18 x 28cm sponge roll tin with baking paper. 2) Melt the butter in a saucepan large enough to mix all ingredients in. Mix in cocoa, remove from heat and stir in the sugar. 3) Add eggs and mix well, then add vanilla essence. Sift in the flour and baking powder and mix to combine. Pour into prepared tin. 4) Bake for 25-30 minutes or until brownie springs back when touched lightly.",
    },
    {
      id: 6,
      title: "Pizza",
      category: "savoury",
      is_complete: true,
      notes: "",
      link: "https://www.simplyrecipes.com/recipes/homemade_pizza/",
      user_id: 1,
      is_public: false,
      img_url:
        "https://res.cloudinary.com/hqwayz2au/image/upload/v1583828747/labgifgndooppbiwg4li.jpg",
      instructions: "See Link",
    },
    {
      id: 7,
      title: "Bacon and Cheese Quiche",
      category: "savoury",
      is_complete: true,
      notes: "add zucchini",
      link:
        "https://www.pillsbury.com/recipes/bacon-and-cheese-quiche/19288cf4-0cdc-46cc-bc86-4c9bfa799695",
      user_id: 1,
      is_public: false,
      img_url:
        "https://res.cloudinary.com/hqwayz2au/image/upload/v1583798028/enr9binod1bpmao849qf.jpg",
      instructions:
        "1) Heat oven to 350°F. Place pie crust in 9-inch glass pie plate as directed on box for One-Crust Filled Pie. 2) In medium bowl, mix half-and-half, eggs, salt and pepper; set aside. Layer bacon, cheeses and onion in crust-lined plate. Pour egg mixture over top. 3) Bake 40 to 50 minutes or until knife inserted in center comes out clean. Let stand 5 minutes; cut into wedges.",
    },
    {
      id: 8,
      title: "Caesar Salad",
      category: "salad",
      is_complete: true,
      notes: "",
      link: "https://natashaskitchen.com/caesar-salad-recipe/",
      user_id: 1,
      is_public: true,
      img_url:
        "https://res.cloudinary.com/hqwayz2au/image/upload/v1583878647/kwe441rsmrdetobj0ezc.jpg",
      instructions:
        "In a large mixing bowl, combine all of your ingredients and toss gently to coat the lettuce in caesar dressing.",
    },
    {
      id: 9,
      title: "Classic Ragu Bolognese",
      category: "main",
      is_complete: true,
      notes: "add some chilli and italian herbs",
      link:
        "https://www.epicurious.com/recipes/food/views/classic-ragu-bolognese-365181",
      user_id: 2,
      is_public: false,
      img_url:
        "http://res.cloudinary.com/hqwayz2au/image/upload/v1584246138/av7cofu0ak55gobwe9sw.jpg",
      instructions: "See Link",
    },
    {
      id: 10,
      title: "Baked Potatoes",
      category: "sides",
      is_complete: true,
      notes: "add some garlic",
      link: "https://www.allrecipes.com/recipe/54679/perfect-baked-potato/",
      user_id: 2,
      is_public: false,
      img_url:
        "https://res.cloudinary.com/hqwayz2au/image/upload/v1583874714/j8dum8jn0pro8jvaodsk.jpg",
      instructions:
        "1) Preheat the oven to 300 degrees F (150 degrees C). Scrub the potato, and pierce the skin several times with a knife or fork. Rub the skin with olive oil, then with salt. 2) Place the potato in the preheated oven, and bake for 90 minutes, or until slightly soft and golden brown. Slice the potato down the center, and serve with butter and black pepper. Sprinkle shredded Cheddar cheese over the top, if desired.  ",
    },
    {
      id: 11,
      title: "Lime, chilli and ginger glazed salmon",
      category: "main",
      is_complete: true,
      notes: "Rice - basmati, sushi or jasmine rice",
      link:
        "https://www.eatwell.co.nz/recipe/7044/Lime-chilli-and-ginger-glazed-salmon-with-Asian-rice-and-greens/?frmcol=1634",
      user_id: 2,
      is_public: true,
      img_url:
        "https://res.cloudinary.com/hqwayz2au/image/upload/v1584409531/u1ikw1umiirqhdsjvgeh.jpg",
      instructions:
        "1) Cook rice according to packet instructions. Add soy sauce, butter and sesame seeds and mix through the rice. 2) Preheat oven to 200C. Line an oven tray or dish with baking paper and lay salmon fillets (flesh side up) on top. 3) Mix sweet chilli, lime juice and zest and ginger and spoon over salmon. 4) Season with salt and pepper. Bake for 6-7 minutes or until salmon is just cooked through. 5) Cook greens in boiling water for 1 minute. Drain and drizzle with a little sesame oil. 6) Divide rice between plates, top with a piece of salmon and Asian greens. 7) Serve with a lime wedge to squeeze over salmon (optional). ",
    },
    {
      id: 12,
      title: "Polpette, Italian meatballs",
      category: "main",
      is_complete: true,
      notes: "Extra olive oil for frying if using this method",
      link: "https://nonnasway.com/polpette-italian-meatballs/",
      user_id: 1,
      is_public: true,
      img_url:
        "https://res.cloudinary.com/hqwayz2au/image/upload/v1584401018/toltj3g3jkzcdeafigzq.jpg",
      instructions:
        "1) Combine beef, veal and pork and a large bowl. 2) Add the other ingredients and mix altogether using your bare hands for best results. The mixture should be very moist but still hold its shape when rolled into meatballs. 3) Coat your hands with olive oil and shape into meatballs to desired size. 4) At this point, you can either brown the meatballs in a frying pan or broil them in the oven.   ",
    },
    {
      id: 13,
      title: "Spring minestrone",
      category: "main",
      is_complete: true,
      notes: "crusty bread to serve",
      link: "https://www.olivemagazine.com/recipes/healthy/spring-minestrone/",
      user_id: 3,
      is_public: true,
      img_url:
        "https://res.cloudinary.com/hqwayz2au/image/upload/v1584410041/em66czzidxmn4xlh6qfa.jpg",
      instructions:
        "1) Put the pancetta into a large non-stick pan and cook until crisp and the fat has rendered. Add the spring onions and fennel with some seasoning, and cook gently for 5 minutes until the fennel is beginning to soften. 2) Add the garlic and cook for 1 minute until fragrant, then pour in the stock and beans. Bring to the boil and simmer for 5 minutes, then add the asparagus tips and sugar snaps, and simmer for another 5 minutes. 3) Stir in the peas and spinach, and cook for a few minutes until the spinach has wilted, then spoon into bowls, top with parmesan and serve with bread, if you like.",
    },
    {
      id: 14,
      title: "Tiramisu",
      category: "dessert",
      is_complete: true,
      notes: "use Amaretto/Almond liqueur or Baileys in place of Marsala wine",
      link: "https://sallysbakingaddiction.com/tiramisu/#tasty-recipes-71824",
      user_id: 3,
      is_public: true,
      img_url:
        "https://res.cloudinary.com/hqwayz2au/image/upload/v1584411313/emqjw9ptvtmrarqzwscx.jpg",
      instructions: "See Link",
    },
    {
      id: 15,
      title: "Apple Pie",
      category: "dessert",
      is_complete: true,
      notes: "",
      link:
        "https://www.allrecipes.com/recipe/12682/apple-pie-by-grandma-ople/",
      user_id: 3,
      is_public: true,
      img_url:
        "https://res.cloudinary.com/hqwayz2au/image/upload/v1584414480/gr9uq1jvbvftsmslmy0j.jpg",
      instructions:
        "1) Preheat oven to 425 degrees F (220 degrees C). Melt the butter in a saucepan. Stir in flour to form a paste. Add water, white sugar and brown sugar, and bring to a boil. Reduce temperature and let simmer. 2) Place the bottom crust in your pan. Fill with apples, mounded slightly. Cover with a lattice work crust. Gently pour the sugar and butter liquid over the crust. Pour slowly so that it does not run off. 3) Bake 15 minutes in the preheated oven. Reduce the temperature to 350 degrees F (175 degrees C). Continue baking for 35 to 45 minutes, until apples are soft.",
    },
  ]);
  await knex.raw(
    "SELECT setval('recipes_id_seq', (SELECT MAX(id) from recipes))"
  );
};
