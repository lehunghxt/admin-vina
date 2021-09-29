import React from 'react'

const DisplayLog = ({ data, type }) => {
    if (!data || data.length < 1) return null
    if (!Array.isArray(data)) data = [data];
    switch (type) {
        case 1:
            return <LogType1 data={data} />
        default: return null
    }
}

const LogType1 = ({ data }) => {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-sm">
                <thead>
                    <tr>
                        <th rowSpan="2">STT</th>
                        <th rowSpan="2">MST</th>
                        <th colSpan="2">Danh sách hóa đơn</th>
                    </tr>
                    <tr>
                        <th>Số hóa đơn</th>
                        <th>Mã tra cứu</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e, index) =>
                        <tr key={e.Id} role="row" className={index % 2 == 0 ? "odd" : "even"}>
                            <td>{(index + 1)}</td>
                            <td>{e.customer}</td>
                            <td>
                                <table className="table table-bordered table-sm">
                                    {e.info && e.info.length > 0 && e.info.map(i =>
                                        <tr key={i.IvoiceCode}>
                                            <td>{i.InvoiceNumber}</td>
                                            <td>{i.IvoiceCode}</td>
                                        </tr>
                                    )}
                                </table>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DisplayLog
