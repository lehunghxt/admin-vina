import { Component } from 'react'
import Link from 'next/link';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log({ error, errorInfo });
    }

    render() {
        return this.state.hasError ?
            <div className="container-fluid">
                <div className="text-center">
                    <div className="error mx-auto" data-text="500">500</div>
                    <p className="lead text-gray-800 mb-5">Oops!</p>
                    <p className="text-gray-500 mb-0">Đã có lỗi xảy ra...</p>
                    <Link href="/" passHref={false}><a href="/">← Quay về trang chính</a></Link>
                </div>
            </div>
            :
            this.props.children;
    }
}

export default ErrorBoundary