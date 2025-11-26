const SocialLink = ({ href, ariaLabel, icon } : {href: string, ariaLabel: string, icon: string}) => {
    return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d={icon} />
        </svg>
    </a>
}

export default SocialLink
