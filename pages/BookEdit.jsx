
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

    function handleChange({ target }) {
        console.log('target', target.type);
        let { value, name: field } = target

        console.log('value', value);
        console.log('field', field);

        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break

        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }
    function handleChangeListPrice({ target }) {
        console.log('target', target.type);
        let { value, name: field } = target

        console.log('value', value);
        console.log('field', field);

        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break

        }
        setBookToEdit((prevBook) => ({
            ...prevBook,
            listPrice: { ...prevBook.listPrice, [field]: value }
        }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => navigate('/book'))
            .catch(err => {
                console.log('Cannot save!', err)
            })

    }


    const {  title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail,
        language, listPrice } = bookToEdit
    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
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
                <input onChange={handleChange} value={pageCount} type="number" name="pageCount" id="pageCount" />

                <label htmlFor="categories">Categories</label>
                <input onChange={handleChange} value={categories} type="text" name="categories" id="categories" />

                <label htmlFor="thumbnail">Thumbnail</label>
                <input onChange={handleChange} value={thumbnail} type="text" name="thumbnail" id="thumbnail" />

                <label htmlFor="language">Language</label>
                <input onChange={handleChange} value={language} type="text" name="language" id="language" />

                <label htmlFor="amount">Amount</label>
                <input onChange={handleChangeListPrice} value={listPrice.amount} type="number" name="amount" id="amount" />

                <label htmlFor="currencyCode">CurrencyCode</label>
                <input onChange={handleChangeListPrice} value={listPrice.currencyCode} type="text" name="currencyCode" id="currencyCode" />

                <label htmlFor="isOnSale">IsOnSale</label>
                <input onChange={handleChangeListPrice} value={listPrice.isOnSale} type="checkbox" name="isOnSale" id="isOnSale" />


                <button>Save</button>
            </form>
        </section>
    )

}