const axios = require('axios');
const TodoDTO = require('../response-model-dto/todo');

class Request
{

    async getTodo()
    {
        try
        {
            const toBeResolved = []
            for (let i = 2;i <= 40;i += 2)
            {
                toBeResolved.push(axios.get(`https://jsonplaceholder.typicode.com/todos/${ i }`))
            }
            const responses = await Promise.all(toBeResolved);
            const Todos = [...responses.filter(res =>res.data).map(res =>
            {
                let todo = new TodoDTO(res.data.title, res.data.completed)
                return todo;
            })];
            return Todos;
        } catch (e)
        {
            throw new Error(`Error fetching TODOs: ${ e.message }`);
        }
    }
}
module.exports = Request;