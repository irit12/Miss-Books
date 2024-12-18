const { useState } = React

export function LongTxt({txt, length = 100 }) {
    const [isShowFullTxt, setIsShowFullTxt] = useState(false)

    function onToggleIsShowLong() {
        setIsShowFullTxt(isShowLong => !isShowLong)
    }

    const isTextOverflow = txt.length > length
    const textToShow = (isShowFullTxt || !isTextOverflow) ? txt : (txt.substring(0, length)) + '...'
    return (
        <section>
            <p>{textToShow}</p>
            {isTextOverflow &&
                <div>
                    <button onClick={onToggleIsShowLong}>
                        {isShowFullTxt ? 'Show Less' : 'Read More'}
                    </button>
                </div>
            }
        </section>
    );
}