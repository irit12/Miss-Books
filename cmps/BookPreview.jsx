export function BookPreview({ book }) {

    return (
        <article className="book-preview">
            <h2>Id: {book.id}</h2>
            <h4>Book Title: {book.title}</h4>
            {book.listPrice.isOnSale && <h1>On Sale!!</h1>}
            <img src={book.thumbnail} alt="book-image" />
       </article>
    )
}