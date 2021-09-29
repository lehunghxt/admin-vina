function Error({ statusCode }) {
    return (
        <>
            {statusCode === 404 ?
                `Page not found` :
                statusCode === 401
                    ? `Unauthorized` :
                    statusCode === 403
                        ? `Forbidden`
                        : 'An error occurred on client'
            }
        </>
    )
}

Error.getInitialProps = ({ query, res, err }) => {
    let statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    if (req.path)
        return { statusCode }
}

export default Error