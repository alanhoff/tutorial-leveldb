// Conseguimos fazer pesquisas básicas e muito rápidas
// utilizando ás opções gte e lte de uma read Stream
var uuid = require('uuid');
var db = require('levelup')(__dirname + '/../db');

function inserir(){
  console.log('Iniciando insersão de valores.');

  // Vamos inserir várias chaves no nosso banco de
  // dados, e vamos separar por grupo de usuários. Utilizamos
  // o pacote uuid para gerar ids aleatórios para cada registro
  var usuarios = [
    {type: 'put', key: 'usuario:' + uuid.v4(), value: 'John Doe'},
    {type: 'put', key: 'usuario:' + uuid.v4(), value: 'Alan Park'},
    {type: 'put', key: 'usuario:' + uuid.v4(), value: 'Roselina Thompson'},
    {type: 'put', key: 'admin:' + uuid.v4(), value: 'Augusto Morris'},
    {type: 'put', key: 'admin:' + uuid.v4(), value: 'João Abelardo'},
    {type: 'put', key: 'admin:' + uuid.v4(), value: 'Ninguém'}
  ];

  // Vamos inserir todos esses registros usando operações batch
  db.batch(usuarios, function(err){
    if(err)
      throw err;

    // Vamos para o próximo passo
    pesquisar();
  });
}

function pesquisar(){
  console.log('Iniciando pesquisa de usuários.');

  // Desta vez vamos criar uma stream de leitura, vamos
  // instanciar esta variável para guardar todos os registros
  var usuarios = [];

  // Criamos uma stream de leitura, que lerá apenas os registros que começas
  // com 'usuario'
  var stream = db.createReadStream({
    gte: 'usuario:!',
    lte: 'usuario:~'
  });

  // Quando acharmos um usuário, guardamos eles na nossa array
  stream.on('data', function(data){
    usuarios.push(data);
  });

  // Precisamos saber quando a stream vai terminar, note que todos
  // os admins ficaram de fora
  stream.on('end', function(){
    console.log('Usuários encontrados:');
    console.dir(usuarios);
  });

}

// Iniciamos o fluxo
inserir();
