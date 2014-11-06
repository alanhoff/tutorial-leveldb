// Usando streams para recuperar várias chaves ou executar operaçõe batch
var db = require('levelup')(__dirname + '/../db');
var util = require('util');
var Transform = require('stream').Transform;

function inserir(){
  console.log('Iniciando insersão de valores.');

  // Criamos uma stream de gravação
  var stream = db.createWriteStream();

  // Escutamos por erros
  stream.on('error', function(err){
    throw err;
  });

  // Esperamos a stream acabar para passar para
  // a próxima etapa do tutorial
  stream.on('close', function(){
    console.log('Inserção terminada!');
    recuperar();
  });

  // Começamos a escrever dados na stream
  stream.write({key: 'teste', value: 'hello world!'});
  stream.write({key: 'teste1', value: 'hello world!'});
  stream.write({key: 'teste2', value: 'hello world!'});
  stream.write({key: 'teste3', value: 'hello world!'});
  stream.write({key: 'teste4', value: 'hello world!'});
  stream.write({key: 'teste5', value: 'hello world!'});

  // Terminamos a stream
  stream.end();

}

function recuperar(){
  console.log('Iniciando recupação de valores.');

  // Desta vez vamos criar uma stream de leitura, vamos
  // instanciar esta variável para guardar todos os registros
  var dados = [];

  // Criamos a stream de leitura
  var stream = db.createReadStream();

  // Escutamos por erros
  stream.on('error', function(err){
    throw err;
  });

  // Esperamos a stream acabar para passar para
  // a próxima etapa do tutorial
  stream.on('end', function(){
    console.log('Recuperamos %s dados.', dados.length);

    // Vamos para o próximo passo
    limpar();
  });

  // Quando um valor for encontrado, este evento irá disparar
  stream.on('data', function(data){
    console.log('Chave %s encontrada com valor de %s', data.key, data.value);

    // Adicionamos ao nosso set de busca
    dados.push(data);
  });

}

function limpar(){

  // Vamos limpar o nosso banco de dados usando streams, pipes e transformação
  console.log('Iniciando limpeza do banco de dados');

  var readStream = db.createReadStream();
  var writeStream = db.createWriteStream();

  // Quando a writeStream acabar, nosso trabalho aqui acabou também
  writeStream.on('close', function(){
    console.log('Operações terminadas!');
  });

  // Criamos uma classe para transformar os valores encontrados
  // em valors que a writStream entenderá como operação para apagar registros
  // {type: 'del', key: 'minha chave'}
  var Deletar = function(){
    if (!(this instanceof Deletar))
      return new Deletar();

    Transform.call(this, {
      objectMode: true // Estamos recebendo objetos
    });

  };

  util.inherits(Deletar, Transform);

  Deletar.prototype._transform = function(chunk, encoding, done){
    console.log('Deletando chave %s', chunk.key);

    this.push({type: 'del', key: chunk.key});
    done();
  };

  // Usamos o pipe para juntas todas as streams
  readStream.pipe(new Deletar()).pipe(writeStream);

}

// Iniciamos o fluxo
inserir();
