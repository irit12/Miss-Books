
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Problem getting book', err);
            })
    }
    console.log(bookToEdit);

    function handleChange({target}) {
        console.log('target',target.type);
        let { value, name: field ,id} = target

        console.log('value',value);
        console.log('field',field);
        console.log('id',id);
        
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
            case 'text':
                if(field === 'listPrice'){
                    // setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
                    if(id === 'amount') +target.value
                    setBookToEdit((prevBook) => ({
                        ...prevBook, 
                        listPrice: {
                            ...prevBook.listPrice,  
                            [id]: value    
                        }
                    }))
                    break
                }
                break
            
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => navigate('/book'))
            .catch(err => {
                console.log('Cannot save!', err)
            })

    }


    const { id, title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail,
        language, listPrice } = bookToEdit
    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="id">Id</label>
                <input onChange={handleChange} value={id} type="text" name="id" id="id" />
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />
                <label htmlFor="subtitle">Subtitle</label>
                <input onChange={handleChange} value={subtitle} type="text" name="subtitle" id="subtitle" />
                <label htmlFor="authors">Authors</label>
                <input onChange={handleChange} value={authors} type="text" name="authors" id="authors" />
                <label htmlFor="publishedDate">PublishedDate</label>
                <input onChange={handleChange} value={publishedDate} type="text" name="publishedDate" id="publishedDate" />
                <label htmlFor="description">Description</label>
                <input onChange={handleChange} value={description} type="text" name="description" id="description" />
                <label htmlFor="pageCount">PageCount</label>
                <input onChange={handleChange} value={pageCount} type="rang" name="pageCount" id="pageCount" />
                <label htmlFor="categories">Categories</label>
                <input onChange={handleChange} value={categories} type="text" name="categories" id="categories" />
                <label htmlFor="thumbnail">Thumbnail</label>
                <input onChange={handleChange} value={thumbnail} type="text" name="thumbnail" id="thumbnail" />
                <label htmlFor="language">Language</label>
                <input onChange={handleChange} value={language} type="text" name="language" id="language" />
                <label htmlFor="listPrice">ListPrice</label>
                <input onChange={handleChange} value={listPrice} type="text" name="listPrice" id="amount" />
                <label htmlFor="listPrice">ListPrice</label>
              
                <button>Save</button>
            </form>
        </section>
    )

}