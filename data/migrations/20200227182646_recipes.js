exports.up = function(knex) {
  return knex.schema
    .createTable("recipes", tbl => {
      tbl.increments();
      tbl
        .string("recipe_name", 128)
        .notNullable()
        .unique();
      tbl.string("description").notNullable();
      // tbl.string('category');
      // tbl.integer('category_id').notNullable().references('categories.id');
    })
    .createTable("categories", tbl => {
      tbl.increments();
      tbl.string("category_name");
    })
    .createTable("units", tbl => {
      tbl.increments();
      tbl.string("unit_name", 128).notNullable();
    })
    .createTable("ingredients", tbl => {
      tbl.increments();
      tbl.string("ingredient_name", 128).notNullable();
    })
    .createTable("recipe_ingredients", tbl => {
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipes.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("ingredients.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("unit_id")
        .notNullable()
        .unsigned()
        .references("units.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.float("quantity").notNullable();
      tbl.primary(["recipe_id", "ingredient_id"]);
    })
    .createTable("steps", tbl => {
      tbl.increments();
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipes.id");
      tbl.integer("step_number").notNullable();
      tbl.string("instructions", 128).notNullable();
    })
    .createTable("recipe_categories", tbl => {
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipes.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("category_id")
        .unsigned()
        .notNullable()
        .references("categories.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.primary(["recipe_id", "category_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("recipe_categories")
    .dropTableIfExists("steps")
    .dropTableIfExists("recipe_ingredients")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("units")
    .dropTableIfExists("categories")
    .dropTableIfExists("recipes");
};
