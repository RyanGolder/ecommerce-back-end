const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
try {
  const categoryData = await Category.findOne({
    where: req.params.id,
    include: [Product],
  });
  if (!categoryData) {
    res.status(404).json({ message: 'No product found with that id!'});
    return;
  }

  res.status(200).json(categoryData);
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update category data
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedCategory) => {
      // Check if any category was updated
      if (updatedCategory[0] === 0) {
        res.status(404).json({ message: 'Category not found' });
      } else {
        res.status(200).json({ message: 'Category updated successfully' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with this id!'});
      return;
    }

    res.status(200).json(category);
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

module.exports = router;