import React from 'react'
import Moment from 'react-moment';

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
    for(var i = 0; i <  data.length; i ++){
        const details = JSON.parse(data[i].JSON);
        processData.push({
            UserName : data[i].AccountModel.UserName,
            CreateDate : data[i].CreateDate,
            customer : details.customer,
            info :details.info,
        })
    }
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
                            {processData.map((e, index) =>
                                <tr key={e.Id} role="row" className={index % 2 == 0 ? "odd" : "even"}>
                                    <td className='text-center' style={{verticalAlign:'middle'}}>{(index + 1)}</td>
                                    <td className='text-center' style={{verticalAlign:'middle'}}>{e.UserName}</td>
                                    <td className='text-center' style={{verticalAlign:'middle'}}><Moment format="DD/MM/YYYY">{e.CreateDate}</Moment></td>
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
    var processData = [];
    for(var i = 0; i <  data.length; i ++){
        const details = JSON.parse(data[i].JSON);
        processData.push({
            UserName : data[i].AccountModel.UserName,
            CreateDate : data[i].CreateDate,
            customerIds : details.customerIds,
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
    for(var i = 0; i <  data.length; i ++){
        const details = JSON.parse(data[i].JSON);
        processData.push({
            UserName : data[i].AccountModel.UserName,
            CreateDate : data[i].CreateDate,
            TaxCode : details.TaxCode,
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
