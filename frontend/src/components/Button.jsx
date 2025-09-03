function Button({content ,className='',onClick}){
    return (
        <div>
            <button 
            type="button" onClick={onClick} className={`max-w-80 mt-3 text-white
            bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-4
            focus:ring-gray-300 font-medium rounded-md
            text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 
            dark:focus:ring-gray-700 dark:border-gray-700 ${className}`}>
                {content}
            </button>
        </div>
    )
}

export default Button