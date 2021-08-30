import Link from "next/link"

function Index() {
    return (
        <>
            <button type="button" className="btn btn-secondary">
                <Link href="/taxreport/hanoi" passHref={true}>
                    <i className="link">Báo cáo thuế Hà Nội</i>
                </Link>
            </button>
            <button type="button" className="btn btn-secondary">
                <Link href="/taxreport/phutho" passHref={true}>
                    <i className="link">Báo cáo thuế Phú Thọ</i>
                </Link>
            </button>
        </>
    )
}

export const getServerSideProps = async () => {
    // if (!req.session.User.Roles.includes('bao_cao_hn')) {
    //     return {
    //         redirect: {
    //             status: 401,
    //             permanent: false,
    //             destination: "/",
    //         }
    //     }
    // }
    return {
        props: {}
    }
}

export default Index
