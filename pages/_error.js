function Error({ statusCode }) {
    return (
        <>
            {statusCode === 404 ?
                `Page not found` :
                statusCode === 401
                    ? `Unauthorized`
                    : 'An error occurred on client'
            }
        </>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error