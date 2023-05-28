const listaNomes = ['Miguel', 'Davi', 'Gabriel', 'Arthur', 'Lucas', 'Matheus', 'Pedro', 'Guilherme', 'Gustavo', 'Rafael', 'Felipe', 'Bernardo', 'Enzo', 'Nicolas', 'João Pedro', 'Pedro Henrique', 'Cauã', 'Vitor', 'Eduardo', 'Daniel', 'Henrique', 'Murilo', 'Vinicius', 'Samuel', 'Pietro', 'João Vitor', 'Leonardo', 'Caio', 'Heitor', 'Lorenzo', 'Isaac', 'Lucca', 'Thiago', 'João Gabriel', 'João', 'Theo', 'Bruno', 'Bryan', 'Carlos Eduardo', 'Luiz Felipe', 'Breno', 'Emanuel', 'Ryan', 'Vitor Hugo', 'Yuri', 'Benjamin', 'Erick', 'Enzo Gabriel', 'Fernando', 'Joaquim', 'André', 'Tomás', 'Francisco', 'Rodrigo', 'Igor', 'Antonio', 'Ian', 'Luiz Otávio', 'Juan', 'João Guilherme', 'Diogo', 'Otávio', 'Nathan', 'Calebe', 'Danilo', 'Luan', 'Luiz Henrique', 'Kaique', 'Alexandre', 'João Miguel', 'Iago', 'Ricardo', 'Raul', 'Marcelo', 'Julio César', 'Cauê', 'Benício', 'Vitor Gabriel', 'Augusto', 'Pedro Lucas', 'Luiz Gustavo', 'Giovanni', 'Renato', 'Diego', 'João Paulo', 'Renan', 'Luiz Fernando', 'Anthony', 'Lucas Gabriel', 'Thales', 'Luiz Miguel', 'Henry', 'Marcos Vinicius', 'Kevin', 'Levi', 'Enrico', 'João Lucas', 'Hugo', 'Luiz Guilherme', 'Matheus Henrique', 'Helena', 'Alice', 'Laura', 'Manuela', 'Sophia', 'Isabella', 'Luísa', 'Heloísa', 'Cecília', 'Maitê', 'Eloá', 'Elisa', 'Liz', 'Júlia', 'Maria Luísa', 'Valentina', 'Maria Alice', 'Lívia', 'Antonella', 'Lorena', 'Ayla', 'Isis', 'Maria Júlia', 'Maya', 'Maria Clara', 'Esther', 'Giovanna', 'Lara', 'Sarah', 'Beatriz', 'Aurora', 'Mariana', 'Maria Cecília', 'Olívia', 'Maria Helena', 'Isadora', 'Luna', 'Catarina', 'Melissa', 'Maria Eduarda', 'Lavínia', 'Agatha', 'Emanuelly', 'Maria', 'Alícia', 'Rebeca', 'Ana Clara', 'Yasmin', 'Clara', 'Marina', 'Ana Júlia', 'Ana Luísa', 'Isabelly', 'Ana Laura', 'Rafaela', 'Ana Liz', 'Stella', 'Gabriela', 'Vitória', 'Allana', 'Mirella', 'Milena', 'Bella', 'Ana', 'Nicole', 'Emilly', 'Maria Vitória', 'Mariah', 'Clarice', 'Letícia', 'Laís', 'Maria Liz', 'Bianca', 'Melina', 'Jade', 'Ana Beatriz', 'Maria Fernanda', 'Betina', 'Maria Valentina', 'Maria Laura', 'Heloíse', 'Maria Isis', 'Zoe', 'Louise', 'Malu', 'Melinda', 'Ana Cecília', 'Ana Lívia', 'Ana Vitória', 'Maria Heloísa', 'Chloe', 'Maria Flor', 'Pietra', 'Pérola', 'Ana Sophia', 'Maria Elisa', 'Gabrielly', 'Larissa', 'Maria Eloá', 'Eduarda'];
const listaSobrenomes = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Araujo', 'Vieira', 'Barbosa', 'Rocha', 'Dias', 'Nascimento', 'Andrade', 'Marques', 'Moreira', 'Sousa', 'Nunes', 'Machado', 'Mendes', 'Freitas', 'Cardoso', 'Ramos', 'Goncalves', 'Santana', 'Teixeira', 'Reis', 'Melo', 'Borges', 'Junior', 'Batista', 'Moraes', 'Campos', 'Monteiro', 'Castro', 'Barros', 'Moura', 'Miranda', 'Garcia', 'Duarte', 'Medeiros', 'Pinheiro', 'Rosa', 'Brito', 'Nogueira', 'Cruz', 'Cristina', 'Tavares', 'Cunha', 'Henrique', 'Silveira', 'Leite', 'Correa', 'Fonseca', 'Coelho', 'Pires', 'Azevedo', 'Neves', 'Amaral', 'Menezes', 'Braga', 'Morais', 'Macedo', 'Viana', 'Queiroz', 'Maia', 'Farias', 'Matos', 'Camargo', 'Siqueira', 'Carlos', 'Amorim', 'Xavier', 'Bezerra', 'Guimaraes', 'Dantas', 'Pinto', 'Luiz', 'Aguiar', 'Jose', 'Mello', 'Faria', 'Barreto', 'Figueiredo', 'Maciel'];

function random(maxValue) {
  return Math.floor(Math.random() * maxValue);
}

function emailFromName(fullName) {
  let email = fullName.toLowerCase();

  email = email.replaceAll(" ", ".");
  email = email + "@gmail.com";

  return email;
}

function createName() {
  return listaNomes[random(listaNomes.length)] + " " + listaSobrenomes[random(listaSobrenomes.length)] + " " + listaSobrenomes[random(listaSobrenomes.length)];
}

for (let i = 0; i < 1000; i++) {
  const fullName = createName();
  const email = emailFromName(fullName);

  console.log("insert into users(name, email, type) values('" + fullName + "','" + email + "', 'client');");
}