<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 900px; margin: 20px auto; padding: 25px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">

  <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; font-weight: 600;">
    Arquitetura do Projeto
  </h1>

  <p style="font-size: 1.1em; background-color: #ecf0f1; padding: 15px; border-radius: 5px; border-left: 5px solid #3498db;">
    Eu estruturei este projeto seguindo os princípios da <strong>Clean Architecture</strong>. A regra principal é a <strong>Regra de Dependência</strong>: o código só pode apontar para "dentro".
  </p>

  <p style="font-size: 1.1em;">
    As camadas externas (como a API com Express e o Banco de Dados com Prisma) podem depender das camadas internas (regras de negócio), mas as camadas internas não podem <em>nunca</em> depender das camadas externas.
  </p>

  <p style="font-size: 1.1em; font-weight: 600; color: #2c3e50;">
    O fluxo de dependência é: <code>Infrastructure</code> → <code>Application</code> → <code>Domain</code>
  </p>

  <p>Nossa estrutura de pastas reflete isso:</p>
  <ul style="list-style-type: '📂'; padding-left: 30px;">
    <li style="margin-bottom: 5px;"><code>src/domain</code> (O Coração)</li>
    <li style="margin-bottom: 5px;"><code>src/application</code> (Os Casos de Uso)</li>
    <li style="margin-bottom: 5px;"><code>src/infrastructure</code> (As Ferramentas)</li>
  </ul>

  <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

  <h2 style="color: #c0392b; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
    1. Camada <code>domain</code> (O Coração)
  </h2>
  <p>
    Esta é a camada mais interna e importante. Ela contém a lógica de negócio pura, que não depende de nenhuma tecnologia externa.
  </p>
  <h3 style="color: #2980b9; margin-top: 20px;">O que tem aqui?</h3>
  <ul style="padding-left: 20px;">
    <li style="margin-bottom: 10px;">
      <strong>Entidades (<code>Book.ts</code>):</strong> São as classes que representam os conceitos do negócio. É aqui que eu coloco regras como "um livro precisa ter um título" ou "um livro não pode ter 0 páginas" (no método <code>Book.create()</code>). Elas não sabem o que é Prisma ou Express.
    </li>
    <li style="margin-bottom: 10px;">
      <strong>Interfaces de Repositório (<code>IBookRepository.ts</code>):</strong> São "contratos" que definem o que eu preciso que o banco de dados faça (ex: <code>save</code>, <code>findByIsbn</code>), mas sem dizer <em>como</em> ele vai fazer.
    </li>
  </ul>
  <p>
    <strong>Dependências:</strong> Nenhuma. Esta camada é TypeScript puro e não depende de nenhuma outra camada do projeto.
  </p>

  <h2 style="color: #27ae60; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
    2. Camada <code>application</code> (Os Casos de Uso)
  </h2>
  <p>
    Esta camada define o que a minha aplicação <em>faz</em>. Ela orquestra as regras da camada <code>domain</code> para executar tarefas específicas.
  </p>
  <h3 style="color: #2980b9; margin-top: 20px;">O que tem aqui?</h3>
  <ul style="padding-left: 20px;">
    <li style="margin-bottom: 10px;">
      <strong>Casos de Uso (<code>CreateBookUseCase.ts</code>):</strong> São classes que executam uma única tarefa. Por exemplo, a lógica de "Para criar um livro, primeiro verifique se o ISBN já existe e, se não, salve-o" fica aqui.
    </li>
    <li style="margin-bottom: 10px;">
      <strong>DTOs (Data Transfer Objects):</strong> São tipos simples (<code>CreateBookRequestDTO</code>) que eu uso para passar dados para os Casos de Uso e para fora deles, sem acoplar com o Express.
    </li>
  </ul>
  <p>
    <strong>Dependências:</strong> Depende apenas da camada <code>domain</code>. Ela usa as Entidades e chama as Interfaces de Repositório, mas não sabe qual banco de dados ou API está sendo usado.
  </p>

  <h2 style="color: #7f8c8d; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
    3. Camada <code>infrastructure</code> (As Ferramentas)
  </h2>
  <p>
    Esta é a camada mais externa. É onde ficam as tecnologias, frameworks e tudo o que "toca o mundo real".
  </p>
  <h3 style="color: #2980b9; margin-top: 20px;">O que tem aqui?</h3>
  <ul style="padding-left: 20px;">
    <li style="margin-bottom: 10px;">
      <strong>Implementações de Repositório (<code>PrismaBookRepository.ts</code>):</strong> A classe que <em>realmente</em> sabe usar o Prisma. Ela implementa a interface <code>IBookRepository</code> que o domínio definiu.
    </li>
    <li style="margin-bottom: 10px;">
      <strong>Mappers (<code>PrismaBookMapper.ts</code>):</strong> Classes que traduzem os dados entre o formato do Domínio (classe <code>Book</code>) e o formato do Prisma (modelo <code>Book</code> do <code>schema.prisma</code>).
    </li>
     <li style="margin-bottom: 10px;">
      <strong>Controladores e Rotas (<code>CreateBookController.ts</code>, <code>book.routes.ts</code>):</strong> O código do Express. O Controlador adapta a requisição HTTP (<code>request</code>, <code>response</code>) e chama o Caso de Uso correspondente.
    </li>
     <li style="margin-bottom: 10px;">
      <strong>Servidor (<code>server.ts</code>):</strong> O arquivo que sobe o servidor Express e inicializa a aplicação.
    </li>
  </ul>
  <p>
    <strong>Dependências:</strong> Esta camada depende da <code>application</code> (para chamar os Casos de Uso) e da <code>domain</code> (para implementar as interfaces de repositório).
  </p>

  <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

  <h2 style="color: #3498db; margin-top: 30px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
    Conceitos-Chave (Como tudo se liga)
  </h2>

  <h3 style="color: #2980b9; margin-top: 20px;">1. Inversão de Dependência</h3>
  <p>Este é o conceito principal.</p>
  <ul style="padding-left: 20px;">
    <li style="margin-bottom: 10px;"><strong>O Problema:</strong> O <code>CreateBookUseCase</code> (camada <code>application</code>) precisa salvar no banco, mas ele não pode depender diretamente do <code>PrismaBookRepository</code> (camada <code>infrastructure</code>), pois isso quebraria a Regra de Dependência.</li>
    <li style="margin-bottom: 10px;"><strong>A Solução:</strong> Eu "inverto" a dependência.
        <ol style="padding-left: 25px; margin-top: 10px;">
          <li>O <code>domain</code> define a abstração (<code>IBookRepository</code>).</li>
          <li>O <code>application</code> depende dessa abstração.</li>
          <li>O <code>infrastructure</code> implementa essa abstração.</li>
        </ol>
    </li>
  </ul>
  <p>Dessa forma, o Caso de Uso não sabe que o Prisma existe. Ele só sabe que existe "alguém" que cumpre o contrato <code>IBookRepository</code>.</p>

  <h3 style="color: #2980b9; margin-top: 20px;">2. Injeção de Dependência</h3>
  <p>Este é o <em>mecanismo</em> que eu uso para fazer a Inversão de Dependência funcionar.</p>
  <p>Em vez de uma classe criar suas próprias dependências (ex: <code>new PrismaBookRepository()</code> dentro do Use Case), eu as forneço ("injeto") de fora, através do construtor.</p>
  <p>O único lugar onde as camadas "se encontram" é na nossa <strong>Raiz de Composição (Composition Root)</strong>, que neste projeto fica no arquivo <code>src/infrastructure/http/routes/book.routes.ts</code>.</p>
  
  <p><strong>Exemplo:</strong></p>
  <pre style="background-color: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 5px; overflow-x: auto; font-family: 'Courier New', Courier, monospace; font-size: 0.9em;"><code><span style="color: #8be9fd; font-style: italic;">// 1. Eu crio a implementação concreta (Infra)</span>
<span style="color: #f1fa8c;">const</span> <span style="color: #50fa7b;">prismaBookRepository</span> <span style="color: #ff79c6;">=</span> <span style="color: #ff79c6;">new</span> <span style="color: #50fa7b;">PrismaBookRepository</span>();

<span style="color: #8be9fd; font-style: italic;">// 2. Eu "injeto" ela no construtor do Use Case (Application)</span>
<span style="color: #8be9fd; font-style: italic;">// O Use Case só espera um "IBookRepository", ele não sabe que é o do Prisma.</span>
<span style="color: #f1fa8c;">const</span> <span style="color: #50fa7b;">createBookUseCase</span> <span style="color: #ff79c6;">=</span> <span style="color: #ff79c6;">new</span> <span style="color: #50fa7b;">CreateBookUseCase</span>(prismaBookRepository);

<span style="color: #8be9fd; font-style: italic;">// 3. Eu "injeto" o Use Case no Controller (Infra)</span>
<span style="color: #f1fa8c;">const</span> <span style="color: #50fa7b;">createBookController</span> <span style="color: #ff79c6;">=</span> <span style="color: #ff79c6;">new</span> <span style="color: #50fa7b;">CreateBookController</span>(createBookUseCase);
</code></pre>

  <p style="font-size: 1.1em; background-color: #e8f5e9; padding: 15px; border-radius: 5px; border-left: 5px solid #4caf50; margin-top: 20px;">
    <strong>A Vantagem:</strong> Se amanhã eu quiser trocar o MySQL pelo MongoDB, eu só preciso criar um <code>MongoBookRepository</code> e trocar <em>uma linha</em> de código no <code>book.routes.ts</code>. As camadas <code>application</code> e <code>domain</code> não mudam absolutamente nada.
  </p>

  <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

  <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; font-weight: 600;">
    Diagrama da Arquitetura
  </h2>

  <img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" alt="Diagrama da Clean Architecture por Uncle Bob" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 8px; margin-top: 15px; display: block; margin-left: auto; margin-right: auto;">
  
  <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
  
  <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; font-weight: 600;">
    Tecnologias Utilizadas
  </h2>
  
  <ul style="list-style-type: '🚀'; padding-left: 30px; font-size: 1.1em;">
    <li style="margin-bottom: 10px;">Node.js</li>
    <li style="margin-bottom: 10px;">TypeScript</li>
    <li style="margin-bottom: 10px;">Express</li>
    <li style="margin-bottom: 10px;">Prisma <span style="color: #777;">(ORM)</span></li>
    <li style="margin-bottom: 10px;">MySQL <span style="color: #777;">(Banco de Dados)</span></li>
    <li style="margin-bottom: 10px;"><code>ts-node-dev</code> <span style="color: #777;">(Desenvolvimento com hot-reload)</span></li>
  </ul>

  <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; font-weight: 600;">
    Configuração e Setup
  </h2>
  
  <p style="font-size: 1.1em;">Siga os passos abaixo para rodar o projeto localmente:</p>
  
1.  **Clone este repositório**

2.  **Instale as dependências**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente**

    Crie um arquivo `.env` na raiz do projeto e adicione a sua string de conexão do MySQL:

    ```ini
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
    ```

4.  **Execute as migrations do Prisma**

    Este comando irá criar as tabelas no seu banco de dados com base no `schema.prisma`:

    ```bash
    npx prisma migrate dev
    ```

5.  **Inicie o servidor de desenvolvimento**
    ```bash
    npm run dev
    ```

  <p style="font-size: 1.1em; background-color: #e8f5e9; padding: 15px; border-radius: 5px; border-left: 5px solid #4caf50; margin-top: 20px;">
    Pronto! O servidor estará rodando em <code>http://localhost:3333</code>.
  </p>
