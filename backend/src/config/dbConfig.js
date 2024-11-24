// Importa a classe MongoClient do módulo mongodb para interagir com o banco de dados MongoDB
import { MongoClient } from 'mongodb';

// Função assíncrona para conectar ao banco de dados
export default async function ConectarAoBanco(stringConexao) {
    // Cria uma variável para armazenar o cliente MongoDB
    let mongoClient;

    try {
        // Cria uma nova instância do cliente MongoDB usando a string de conexão fornecida
        mongoClient = new MongoClient(stringConexao);
        console.log('Conectando ao cluster do banco de dados...');

        // Conecta ao banco de dados de forma assíncrona
        await mongoClient.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');

        // Retorna o cliente conectado para uso posterior
        return mongoClient;
    } catch (erro) {
        // Caso ocorra algum erro durante a conexão, imprime a mensagem de erro e encerra o processo
        console.error('Falha na conexão com o banco!', erro);
        process.exit();
    }
}
