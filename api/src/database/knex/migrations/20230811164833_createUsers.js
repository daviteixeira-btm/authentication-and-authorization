exports.up = knex => knex.schema.createTable("users", table => {
  table.increments("id");
  table.text("name").notNullable();
  table.text("email").notNullable();
  table.text("password").notNullable();

  /* Aqui criamos uma coluna 'enum' para definir uma restrição de quais opções de usuário vamos ter
      - Primeiro definimos o nome da coluna, neste caso será 'role' para definir qual função o user vai ter
      - Dentro da array definimos as opções
      - O 'useNative' utiliza o drive do banco de dados nativo para lidar com essa opção de 'enum' da tabela
      - Depois definimos o nome da restrição com o 'enumName', que no caso é 'roles'
      - 'notNullable' pois não iremos permitir valores nulos
      - E como default, todo usuário será 'customer' */
  table
  .enum("role", ["admin", "customer", "sale"], { useNative: true, enumName: "roles"})
  .notNullable().default("customer");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("users");