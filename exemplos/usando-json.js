// O LevelDB pode automaticamente inserir objetos e recuperar
// objetos em JavaScript, basta configurar o tipo de valor
// que você está inserindo
var db = require('levelup')(__dirname + '/../db', {
  valueEncoding: 'json' // Estamos trabalhando com JSON agora
});

function inserir(){
  console.log('Iniciando insersão de valores.');

  db.put('teste-json', {
    hello: 'Hello world!',
    date: new Date()
  }, function(err){
    if(err)
      throw err;

    // Vamos para o próximo passo
    recuperar();
  });

}

function recuperar(){
  console.log('Iniciando recupação de valores.');

  db.get('teste-json', function(err, valor){
    if(err)
      throw err;

    console.dir(valor);
  });
}

// Iniciamos o fluxo
inserir();
