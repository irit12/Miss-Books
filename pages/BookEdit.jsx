
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
        let { value, name: field } = target
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

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => navigate('/book'))
            .catch(err => {
                console.log('Cannot save!', err)
            })

    }


    // const { vendor, speed } = bookToEdit
    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            {/* <form onSubmit={onSaveBook}>
                <label htmlFor="vendor">Vendor</label>
                <input onChange={handleChange} value={vendor} type="text" name="vendor" id="vendor" />

                <label htmlFor="speed">Speed</label>
                <input onChange={handleChange} value={speed} type="number" name="speed" id="speed" />
                <button>Save</button>
            </form> */}
        </section>
    )

}