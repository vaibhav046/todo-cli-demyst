const Request= require('./request/request');
async function main() {
    const todoFetcher = new Request();
    try {
        const todos = await todoFetcher.getTodo();
        todos.forEach(todo => {
            console.log(`Title: ${todo.title}`);
            console.log(`Completed: ${todo.completed}`);
            console.log('\n');
        });
    } catch (error) {
        console.error(error.message);
    }
}

main();

