import { useState } from 'react'
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const DisplayLog = ({ data, type }) => {
    if (!data || data.length < 1) return null
    if (!Array.isArray(data)) data = [data];
    switch (parseInt(type)) {
        case 1:
            return <LogType1 data={data} />
        case 2:
            return <LogType2 data={data} />
        case 3:
            return <LogType3 data={data} />
        default: return null
    }
}
const LogType1 = ({ data }) => {
    var processData = [];
    const ShowListInvoice = list => {
        const html = <>
            {list && list.length > 0 && list.map(i =>
                <ul key={i.IvoiceCode} className='d-flex text-center'>
                    <li style={{ listStyleType: 'none' }} className='w-50'>{i.InvoiceNumber}</li>
                    <li style={{ listStyleType: 'none' }} className='w-50'>{i.IvoiceCode}</li>
                </ul>
            )}
        </>
        MySwal.fire({
            title: "Danh sách hóa đơn hủy",
            html: html,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
        })
    }
    for (var i = 0; i < data.length; i++) {
        const details = JSON.parse(data[i].JSON);
        processData.push({
            UserName: data[i].AccountModel.UserName,
            CreateDate: data[i].CreateDate,
            customer: details.customer,
            info: details.info,
        })
    }
    return (
        <div className='card shadow mt-2'>
            <div className='card-body'>
                <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th className='text-center' style={{ verticalAlign: 'middle' }} >STT</th>
                                <th className='text-center' style={{ verticalAlign: 'middle' }} >Người thực hiện</th>
                                <th className='text-center' style={{ verticalAlign: 'middle' }} >Thời gian thực hiện</th>
                                <th className='text-center' style={{ verticalAlign: 'middle' }} >MST</th>
                                <th className='text-center' >Xem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processData.map((e, index) =>
                                <tr key={e.Id} role="row" className={index % 2 == 0 ? "odd" : "even"}>
                                    <td className='text-center' style={{ verticalAlign: 'middle' }}>{(index + 1)}</td>
                                    <td className='text-center' style={{ verticalAlign: 'middle' }}>{e.UserName}</td>
                                    <td className='text-center' style={{ verticalAlign: 'middle' }}><Moment format="DD/MM/YYYY">{e.CreateDate}</Moment></td>
                                    <td className='text-center' style={{ verticalAlign: 'middle' }}>{e.customer}</td>
                                    <td colSpan="2">
                                        <button className="btn btn-primary btn-sm" type="button" onClick={() => ShowListInvoice(e.info)}>
                                            <i className="fa fa-eye"></i>
                                        </button>
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
    var processData = [];
    for (var i = 0; i < data.length; i++) {
        const details = JSON.parse(data[i].JSON);
        processData.push({
            UserName: data[i].AccountModel.UserName,
            CreateDate: data[i].CreateDate,
            customerIds: details.customerIds,
        })
    }
    return (
        <div className='card shadow mt-2'>
            <div className='card-body'>
                <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th className='text-center'>STT</th>
                                <th className='text-center'>Người thực hiện</th>
                                <th className='text-center'>Thời gian thực hiện</th>
                                <th className='text-center'>ID khách hàng</th>
                            </tr>

                        </thead>
                        <tbody>
                            {processData.map((e, index) =>
                                <tr key={index} role="row" className={index % 2 == 0 ? "odd" : "even"}>
                                    <td className='text-center'>{(index + 1)}</td>
                                    <td className='text-center'>{e.UserName}</td>
                                    <td className='text-center'><Moment format="DD/MM/YYYY">{e.CreateDate}</Moment></td>
                                    <td className='text-center'>{e.customerIds}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const LogType3 = ({ data }) => {
    var processData = [];
    for (var i = 0; i < data.length; i++) {
        const details = JSON.parse(data[i].JSON);
        processData.push({
            UserName: data[i].AccountModel.UserName,
            CreateDate: data[i].CreateDate,
            TaxCode: details.TaxCode,
        })
    }
    return (
        <div className='card shadow mt-2'>
            <div className='card-body'>
                <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th className='text-center'>STT</th>
                                <th className='text-center'>Người thực hiện</th>
                                <th className='text-center'>Thời gian thực hiện</th>
                                <th className='text-center'>MST</th>
                            </tr>

                        </thead>
                        <tbody>
                            {processData.map((e, index) =>
                                <tr key={index} role="row" className={index % 2 == 0 ? "odd" : "even"}>
                                    <td className='text-center'>{(index + 1)}</td>
                                    <td className='text-center'>{e.UserName}</td>
                                    <td className='text-center'><Moment format="DD/MM/YYYY">{e.CreateDate}</Moment></td>
                                    <td className='text-center'>{e.TaxCode}</td>
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