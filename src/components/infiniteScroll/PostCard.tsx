
const PostCard = ({item}) => {
    return (
        <div className="Postcard">
            <div>
                {item.name}
            </div>
            <div>
                {item.role}
            </div>
        </div>
    );
};

export default PostCard;