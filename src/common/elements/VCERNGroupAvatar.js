import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import React from 'react';

export default function VCERNGroupAvatar(props) {
    const { members } = props;

    return (
        <AvatarGroup max={members.length} {...props}>
            {members.map((el, idx) => (
                <Avatar key={idx} alt={el?.first_name} src={el?.image} />
            ))}
        </AvatarGroup>
    );
}
