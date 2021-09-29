import React from 'react'

const DisplayLog = ({ data, type }) => {
    if (!data || data.length < 1) return null
    if (!Array.isArray(data)) data = [data];
    switch (type) {
        case 1:
            return <LogType1 data={data} />
        case 2:
            return <LogType2 data={data} />
        default: return null
    }
}
const LogType1 = ({ data }) => {
    return (
        <div className='card shadow mt-2'>
            <div className='card-body'>
                <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th className='text-center' style={{verticalAlign:'middle'}} rowSpan='2'>STT</th>
                                <th className='text-center' style={{verticalAlign:'middle'}} rowSpan='2'>Người thực hiện</th>
                                <th className='text-center' style={{verticalAlign:'middle'}} rowSpan='2'>Thời gian thực hiện</th>
                                <th className='text-center' style={{verticalAlign:'middle'}} rowSpan='2'>MST</th>
                                <th className='text-center' colSpan="2">Danh sách hóa đơn</th>
                            </tr>
                            <tr>
                                <th className='text-center'>Số hóa đơn</th>
                                <th className='text-center'>Mã tra cứu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((e, index) =>
                                <tr key={e.Id} role="row" className={index % 2 == 0 ? "odd" : "even"}>
                                    <td className='text-center' style={{verticalAlign:'middle'}}>{(index + 1)}</td>
                                    <td className='text-center' style={{verticalAlign:'middle'}}></td>
                                    <td className='text-center' style={{verticalAlign:'middle'}}>{e.CreateDate}</td>
                                    <td className='text-center' style={{verticalAlign:'middle'}}>{e.customer}</td>
                                    <td colSpan="2">
                                        {e.info && e.info.length > 0 && e.info.map(i =>
                                            <ul key={i.IvoiceCode} className='d-flex text-center'>
                                                <li style={{ listStyleType:'none' }} className='w-50'>{i.InvoiceNumber}</li>
                                                <li style={{ listStyleType:'none' }} className='w-50'>{i.IvoiceCode}</li>
                                            </ul>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
const LogType2 = ({ data }) => {
    return (
        <div className='card shadow mt-2'>
            <div className='card-body'>
                <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th className='text-center' style={{verticalAlign:'middle'}}>STT</th>
                                <th className='text-center' style={{verticalAlign:'middle'}}>Người thực hiện</th>
                                <th className='text-center' style={{verticalAlign:'middle'}}>Thời thực hiện</th>
                                <th className='text-center' style={{verticalAlign:'middle'}}>ID người dùng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((e, index) =>
                                <tr key={e.Id} role="row" className={index % 2 == 0 ? "odd" : "even"}>
                                    <td className='text-center' style={{verticalAlign:'middle'}}>{(index + 1)}</td>
                                    <td className='text-center' style={{verticalAlign:'middle'}}></td>
                                    <td className='text-center' style={{verticalAlign:'middle'}}>{e.CreateDate}</td>
                                    <td className='text-center' style={{verticalAlign:'middle'}}>{e.JSON}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default DisplayLog
