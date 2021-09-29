import Head from 'next/head'
import { useState } from 'react'
import { Get } from '@Helper/ApiHelper'
import DisplayLog from '@Component/DisplayLog'

const Log = () => {
    const [query, setQuery] = useState({ page: 1, type: 1 });
    const [data, setData] = useState()
    const handleSubmit = async e => {
        e.preventDefault();
        var res = await Get('/log', { params: query });
        if (res) setData(res)
    }
    const handleInputChange = e => {
        setQuery({ ...query, [e.currentTarget.name]: e.currentTarget.value })
    }
    return (
        <>
            <Head>
                <title>Xem lịch sử</title>
                <link rel="icon" href="/logo.ico" />
            </Head>
            <div className="card shadow">
                <div className="card-header">
                    <h5>Xem lịch sử</h5>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className='row'>
                            <div className="col-md-4">
                                <label>
                                    <b>Từ ngày</b>
                                </label>
                                <input
                                    type="date"
                                    name="fromdate"
                                    id="fromdate"
                                    className="form-control form-control-sm"
                                    value={query.fromdate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <label>
                                    <b>Tới ngày</b>
                                </label>
                                <input
                                    type="date"
                                    name="todate"
                                    id="todate"
                                    className="form-control form-control-sm"
                                    value={query.todate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <label>
                                    <b>Loại</b>
                                </label>
                                <select className="form-control form-control-sm" id="type" name="type" onChange={handleInputChange}>
                                    <option value="1">Hủy hóa đơn</option>
                                    <option value="2">Reset tài khoản</option>
                                    <option value="3">Khóa tài khoản</option>
                                </select>
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className='col-md-12'>
                                <button className="btn btn-sm btn-primary">Tìm kiếm</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
   
            <DisplayLog data={data} type={query.type} />
        </>
    )
}
export const getServerSideProps = function () {
    return {
      props: {},
    };
  };
export default Log
