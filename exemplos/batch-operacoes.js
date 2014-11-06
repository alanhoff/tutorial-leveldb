// Operações em batch são muito mais rápidas e consomem menos
// recursos da máquina, devem serem usadas sempre que possível
var db = require('levelup')(__dirname + '/../db');

function inserir(){

  // Precisamos listar todas as operações que queremos fazer
  var operacoes = [
    // Precisamos especificar o tipo, a chave e o valor dela
    {type: 'put', key: 'hello-word', value: 'Hello world!'},
    {type: 'put', key: 'hello-second-world', value: 'Hello world 2!'},
    {type: 'put', key: 'outra-chave', value: 'Mais uma chave'},
  ];

  // Depois de criar as operações, basta executálas
  db.batch(operacoes, function(err){
    if(err)
      throw err;

    console.log('%s operações concluídas!', operacoes.length);

    // Próximo passo
    remover();
  });
}

function remover(){

  // Também é possível excluir várias chaves ao mesmo tempo
  var operacoes = [
    // Precisamos especificar o tipo, a chave e o valor dela
    {type: 'put', key: 'sera-exckuido', value: 'Certamente!'},
    {type: 'del', key: 'hello-word'},
    {type: 'del', key: 'hello-second-world'},
    {type: 'del', key: 'outra-chave'},
  ];

  // Depois de criar as operações, basta executálas
  db.batch(operacoes, function(err){
    if(err)
      throw err;

    console.log('%s operações concluídas!', operacoes.length);
  });

}

// Iniciamos o fluxo
inserir();
