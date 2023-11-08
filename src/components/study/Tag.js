import React, { useCallback, useEffect, useState } from 'react';

import '../../css/tag_css/Tag.css';

const Tag = ({ onTagChange, tags }) => {
    const [hashtag, setHashtag] = useState('');
    const [tagString, setTagString] = useState(tags);

    useEffect(() => {
        if (typeof tags === 'string') {
            setTagString(tags);
        }
        console.log("tag type of " + typeof tags);
    }, [tags]);

    const onChangeHashtag = (e) => {
        setHashtag(e.target.value);
    };

    const onKeyUp = useCallback(
        (e) => {
            const $HashWrapOuter = document.querySelector('.tag_wrapper');

            if (e.keyCode === 188 && e.target.value.trim() !== '') {
                const newHashTag = e.target.value.replace(/,/g, '').trim();
                setTagString((prevTagString) =>
                    prevTagString.length > 0
                        ? `${prevTagString}, ${newHashTag}`
                        : newHashTag
                );
                setHashtag('');
                e.target.value = '';
            }
        },
        []
    );


    const removeTag = (clickedTag) => {
        const updatedTagString = tagString
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag !== clickedTag)
            .join(',');

        setTagString(updatedTagString || '');
    };

    useEffect(() => {
        onTagChange(tagString);
    }, [tagString, onTagChange]);

    const tagArray = tagString.length > 0 ? tagString.split(',').map((tag) => tag.trim()) : "";

    return (
        <div className="tag_wrapper">
            {tagArray.length > 0 && (
                <div className="tag_list">
                    {tagArray.map((tag, index) => (
                        <div
                            key={index}
                            className="HashWrapInner"
                            onClick={() => removeTag(tag)}
                        >
                            #{tag}
                        </div>
                    ))}
                </div>
            )}
            <input
                className="tag_input"
                type="text"
                name="tag"
                value={hashtag}
                onChange={onChangeHashtag}
                onKeyUp={onKeyUp}
                placeholder="해시태그 입력"
            />
        </div>
    );
};

export default Tag;

