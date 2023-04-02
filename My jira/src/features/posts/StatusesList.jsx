import { useSelector } from "react-redux"
import { selectAllStatuses } from "./statusesSlice"
import StatusDisplay from "./StatusDisplay";
import { selectAllPosts } from "./postsSlice";

const StatusesList = () => {
    const allStatuses = useSelector(selectAllStatuses);
    const allPosts = useSelector(selectAllPosts);

    const statusesDisplay = allStatuses.map((status) => {
        const statusInUse = allPosts.find(post => post.currentStatus === status.title)
        const canDelete = statusInUse ? false : true;
        return <StatusDisplay status={status} canDelete={canDelete}/>
    })

    return (
        <div className="StatusesList">
            <div className="statuseslist-title">Statuses : </div>
            {statusesDisplay}
        </div>
    )
}

export default StatusesList