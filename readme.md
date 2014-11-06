# Tutorial de LevelDB para Node.js

Esse repositório tem como objetivo servir de referência para quem quiser
aprender um pouco mais sobre LevelDB dentro da plataforma Node.js.

### Sobre o LevelDB

O LevelDB é um banco de dados embedded que roda diretamente na sua aplicação,
sem precisar de instalação. Ele opera no estilo chave-valor e foi desenvolido
pela Google utilizando conceitos do banco de dados BigTable. Atualmente é
utilizado como backend do IndexedDB que opera dentro do Google Chrome, também
é um dos backends suportados pelo Riak. Leia mais na [Wikipedia][7].

### Instalação

Todos os pacotes necessários estão inclusos neste repositório, basta você
clonar este repositório, instalar os pacotes com `npm install` e executar
[qualquer um dos exemplos][1].

### Exemplos

* [CRUD básico][0]: inserir, ler, atualizar e deletar registros do banco.
* [Batch de operações][2]: Executar várias operações ao mesmo tempo.
* [Streams básicas][3]: Realizando operações básicas utilizando streams.
* [Pesquisas básicas][4]: Utilizando streams para pesquisar registros
* [Trabalhando com JSON][5]: Podemos trabalhar com JSON para facilitar nossa vida.

### Licença

Copyright (c) 2014, Alan Hoffmeister <alanhoffmeister@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.

[0]: exemplos/crud-basico.js
[1]: exemplos/
[2]: exemplos/batch-operacoes.js
[3]: exemplos/stream-basico.js
[4]: exemplos/pesquisa-basica.js
[5]: exemplos/usando-json.js
[6]: exemplos/plugins.js
[7]: https://en.wikipedia.org/wiki/LevelDB
