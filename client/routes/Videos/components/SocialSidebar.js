import React from 'react'
import SocialButtons from '../../../components/SocialButtons'

export default function SocialSidebar(props) {
    return (
        <div className="social-sidebar">
            <SocialButtons shareable={true} icons={props.icons} />
        </div>
    )
}
