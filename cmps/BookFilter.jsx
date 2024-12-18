import { debounce } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function BookFilter({ defaultFilter, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)
    const onSetFilterDebounce = useRef(debounce(onSetFilter)).current

    useEffect(() => {
        onSetFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

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
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt, minPrice, isOnSale } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Title</label>
                <input value={txt} onChange={handleChange} type="text" name="txt" id="txt" />

                <label htmlFor="minPrice">Min Price</label>
                <input value={minPrice} onChange={handleChange} type="number" name="minPrice" id="minPrice" />

                <label htmlFor="isOnSale">on sale?</label>
                <input value={isOnSale} onChange={handleChange} type="checkbox" name="isOnSale" id="isOnSale" />

                <button>Submit</button>
            </form>
        </section>
    )
}