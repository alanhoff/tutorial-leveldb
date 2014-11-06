var leveldb = require('levelup');

// Precisamos iniciar o banco de dados dizendo onde
// deve persistir as coisas
var db = leveldb(__dirname + '/../db');

function inserir(){

  // Vamos gravar algo no banco de dados
  db.put('nome_da_chave', 'valor_da_chave', function(err){
    if(err)
      throw err;

    // Acabou de inserir, vamos terminar essa promise
    console.log('Chave inserida com sucesso!');

    // Vamos para o próximo passo
    ler();
  });

}


function ler(){

  // Vamos recuperar o valor da chave que gravamos
  db.get('nome_da_chave', function(err, registro){
    if(err)
      throw err;

    console.log('A chave nome_da_chave tem o valor de %s', registro);

    // Próximo passo
    atualizar();
  });

}

function atualizar(){

  // Vamos fazer o update da chave, para isso acontecer só precisamos
  // inserir um registro com o mesmo nome da chave
  db.put('nome_da_chave', 'novo_valor', function(err){
    if(err)
      throw err;

    console.log('Chave atualizada com sucesso!');

    // Próximo passo
    remover();
  });

}

function remover(){

  // Vamos deletar a chave
  db.del('nome_da_chave', function(err){
    if(err)
      throw err;

    console.log('Chave removida com sucesso!');

  });

}

// Iniciamos a cadeia de funções
inserir();

