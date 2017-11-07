
exports.seed = function(knex) {
  return knex('projects').del()
    .then(() => {
      // Inserts seed entries
      return knex('projects').insert([{
        id: 1,
        name: 'North American Nebula',
        object: 'NGC 7000',
        admin_user_id: 1,
        cells: 16,
        cells_w: 4,
        cells_h: 4,
        uncom_cells: 1,
        tel_ota: 'Orion EON 130mm ED Triplet APO Refractor',
        tel_obj: 130,
        focal_length: 910,
        focal_ratio: 7,
        img_sensor: 'Nikon D800a',
        img_array_w: 3872,
        img_array_h: 2592,
        pix_sz: 6.10,
        img_sz_w: 23.60,
        img_sz_h: 15.80,
        fov_w: 5349.68,
        fov_h: 3581.40,
        target_exp: 300,
        total_exposures: 72,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));"
      );
    });
};
