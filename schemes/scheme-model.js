// scheme-model
const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

// find()
// method to return all schemes.

async function find() {
  try {
    return await db("schemes");
  } catch (err) {
    throw err;
  }
}

//----------------------------------------------------------------------------//
// findById()
//----------------------------------------------------------------------------//
// The .first() method provides a simple way to detect empty results. .where()
// returns an array, but it could be an empty array. Using .first() returns the
// first object in the array, and if the array is empty, the first object is
// "undefined", which can be an easy test for "not the data I was looking for".
//
// you could also test the length of the array, and there are other methods to
// determine that the query didn't return the right stuff.
//----------------------------------------------------------------------------//
async function findById(id) {
  try {
    const scheme = await db("schemes").where({ id }).first();
    return scheme;
  } catch (err) {
    throw err;
  }
}

// findsteps()

async function findSteps(id) {
  try {
    const steps = await db("steps as s")
      .join("schemes as sch", "sch.id", "s.scheme_id")
      .where({ scheme_id: id })
      .select("s.id", "sch.scheme_name", "s.step_number", "s.instructions");

    return steps;
  } catch (err) {
    throw err;
  }
}

// add()

// we can just use the findById() method to return the new object after it has
// been added. Knex returns an array of ID's of newly created objects. Since we
// are only creating a single object, we get an array with one value, and use it
// to search for the newly created record.

async function add(schemeData) {
  try {
    const ids = await db("schemes").insert(schemeData);
    const newscheme = await findById(ids[0]);
    return newscheme;
  } catch (err) {
    throw err;
  }
}

// update()
//  using findById() to find the object that changed.

async function update(id, changes) {
  try {
    await db("schemes").where({ id }).update(changes);
    return await findById(id);
  } catch (err) {
    throw err;
  }
}

// remove()

async function remove(id) {
  try {
    return await db("schemes").del().where({ id });
  } catch (err) {
    throw err;
  }
}
