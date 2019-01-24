import React from 'react';

const Post = ({match}) => {
    return (
        <div>
            Please select any post {match.params.id}
        </div>
    );
};

export default Post;