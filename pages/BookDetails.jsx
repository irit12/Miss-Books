
import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx";

const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book', err);
            })
    }

    function onBack() {
        navigate('/book')
        // navigate(-1)
    }

    function getBookAge() {
        const actualFullYear = new Date().getFullYear()
        if (actualFullYear - book.publishedDate > 10) return ', Vintage'
        if (actualFullYear - book.publishedDate < 1) return ', New'
    }

    function getReadingStle() {
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount > 200) return 'Descent Reading'
        if (book.pageCount < 100) return 'Light Reading'
    }

    // console.log('book:', book)
    console.log('Render');

    if (!book) return <div>Details Loading...</div>
    return (
        <section className="book-details">
            <h1>Book Id: {book.id}</h1>
            <h1>Book Title: {book.title}</h1>
            <h1>Book Subtitle: {book.subtitle}</h1>
            <h1>Book Author: {book.authors}</h1>
            <h1>Book Publish Year: {book.publishedDate} {getBookAge()}</h1>
            <h1>Book Description: <LongTxt txt={book.description} /></h1>
            <h1>Book Page Count: {book.pageCount}, {getReadingStle()}</h1>
            <h1>Book Categories: {book.categories.map((categor, i) => i === book.categories.length - 1 ? categor : `${categor}, `)}</h1>
            <h1>Book Language: {book.language}</h1>
            <h1>Book Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h1>
            {book.listPrice.isOnSale && <h1> On Sale!!</h1>}
            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p> */}
            <img src={book.thumbnail} alt="book-image" />
            <button onClick={onBack}>Back</button>
            <section>
                <button><Link to={`/book/${book.prevBookId}`}>Prev Book</Link></button>
                <button><Link to={`/book/${book.nextBookId}`}>Next Book</Link></button>
            </section>
        </section>
    )
}