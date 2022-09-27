require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    //`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    'https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5'
  );
  const apiInfo = await apiUrl.data.results.map((el) => {
    return {
      id: el.id,
      name: el.title,
      image: el.image,
      healthScore: el.healthScore,
      summary: el.summary,
      diets: el.diets,
      steps: el.analyzedInstructions[0]?.steps.map((el) => {
        return {
          number: el.number,
          step: el.step,
        };
      }),
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

//recipes
router.get('/recipes', async (req, res) => {
  const name = req.query.name;
  let recipesTotal = await getAllRecipes();
  if (name) {
    let recipeName = await recipesTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    recipeName.length
      ? res.status(200).send(recipeName)
      : res.status(404).send('recipe not found');
  } else {
    res.status(200).send(recipesTotal);
  }
});

//diets
router.get('/diets', async (req, res) => {
  const diets = await Diet.findAll();
  diets.length ? res.status(200).send(diets) : res.status(404).send('error');
});

//post

router.post('/recipes', async (req, res) => {
  const { name, summary, healthScore, image, steps, diets } = req.body;
  let recipeCreated = await Recipe.create({
    name,
    summary,
    healthScore,
    image,
    steps,
  });
  let dietDb = await Diet.findAll({
    where: { name: diets },
  });
  recipeCreated.addDiet(dietDb);
  res.send('recipe created successfully');
});

router.get('/recipes/:id', async (req, res) => {
  const id = req.params.id;
  const recipesTotal = await getAllRecipes();
  if (id) {
    let recipeId = await recipesTotal.filter((el) => el.id == id);
    recipeId.length
      ? res.status(200).json(recipeId)
      : res.status(404).send('recipe not found!!');
  }
});

module.exports = router;
