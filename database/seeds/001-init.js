
exports.seed = function(knex) {
  // Deletes ALL existing entries
  const roles = [
    {
      name:'admin', 
    }, 
    {
      name:'user', 
    }
  ]
  return knex('roles').insert(roles); 
};
