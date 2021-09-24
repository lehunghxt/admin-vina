import Link from "next/link"

function Index() {
    return (
        <>
            <Link href="/taxreport/hanoi" passHref={true}>
                <button type="button" className="btn btn-secondary mr-5">
                    <i className="link">Báo cáo thuế Hà Nội</i>
                </button>
            </Link>
            <Link href="/taxreport/phutho" passHref={true}>
                <button type="button" className="btn btn-secondary">
                    <i className="link">Báo cáo thuế Phú Thọ</i>
                </button>
            </Link>
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
