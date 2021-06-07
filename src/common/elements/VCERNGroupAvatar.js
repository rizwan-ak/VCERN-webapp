import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import React from 'react';

export default function VCERNGroupAvatar(props) {
    return (
        <AvatarGroup max={4} {...props}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
    );
}
