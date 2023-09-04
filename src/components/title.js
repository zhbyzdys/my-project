
export const Title = ({ title }) => {
    return (
        <span>
            {title}
            <a
                className="title-link"
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >
            </a>
        </span>
    );
}