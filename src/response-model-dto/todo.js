class TodoDTO
{
    constructor (title, completed)
    {
     this._completed = completed;
        this._title = title
    }
    get title()
    {
        return this._title
    }
    get completed()
    {
        return this._completed;
    }

}

module.exports = TodoDTO;