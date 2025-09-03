import {Link} from 'react-router-dom'
function PageBottom({content,toLink,action}){
    return (
        <div className="flex gap-2 font-semibold">
            <div>
                {content}
            </div>
            <Link to={toLink} className='underline'>
                {action}
            </Link>
        </div>
    )
}

export default PageBottom