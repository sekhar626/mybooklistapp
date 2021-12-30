// Book class
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

//UI class
class UI{
    static displayBooks(){
        //localStorage.getItem('books')
        const books=StorageItems.getBooks()
        console.log(books)
        books.forEach(element => UI.addBookToDisplay(element));
    }

    static addBookToDisplay(book){
        const listOfBooks=document.getElementById('book-list')
        const row=document.createElement('tr')
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button class="btn btn-danger delete btn-sm">X</button></td>
        `
        listOfBooks.appendChild(row)

    }

    static clearFields(){
        document.getElementById('title').value="";
        document.getElementById('Author').value="";
        document.getElementById('ISBN').value="";
    }

    static deleteBook(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove()
        }
    }

    static showalertmessage(message,className){
        const div=document.createElement('div')
        div.className=`alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container=document.querySelector('.app-container')
        const formContainer=document.getElementById('form-id')
        container.insertBefore(div,formContainer)
        setTimeout(()=>document.querySelector('.alert').remove(),2500)
    }
        
}

//local storage
class StorageItems{

    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[]
        }else{
            books=JSON.parse(localStorage.getItem('books'))
        }
        console.log(`books ${books}`)
        return books
    }

    static addBook(book){
        const booksFromStore=StorageItems.getBooks()
        console.log(booksFromStore)
        booksFromStore.push(book)
        console.log(booksFromStore)
        localStorage.setItem('books',JSON.stringify(booksFromStore))
    }

    static removeBook(isbn){
        const booksFromStore=StorageItems.getBooks()
        booksFromStore.forEach((book,index)=>{
            if(book.isbn===isbn){
                booksFromStore.splice(index,1)
            }
        })
        console.log(booksFromStore)
        localStorage.setItem('books',JSON.stringify(booksFromStore))
    }
}

//display books
document.addEventListener('DOMcontentLoaded',UI.displayBooks())

//add book
document.getElementById('form-id').addEventListener('submit',(e)=>{
    e.preventDefault()
    const title=document.getElementById('title').value;
    console.log(title)
    const author=document.getElementById('Author').value;
    const isbn=document.getElementById('ISBN').value

    if (title==="" || author==="" || isbn===""){
        UI.showalertmessage('enter all fields','danger')
    }else{
        const book=new Book(title,author,isbn)
        console.log(book)
        UI.addBookToDisplay(book)
        StorageItems.addBook(book)
        UI.showalertmessage('book has been added','success')
        UI.clearFields()
    }

})

//delete book

document.getElementById('book-list').addEventListener('click',(e)=>{
    console.log(e.target)
    UI.deleteBook(e.target)
    StorageItems.removeBook(e.target.parentElement.previousElementSibling.textContent)
    UI.showalertmessage('book has been deleted','info')
})