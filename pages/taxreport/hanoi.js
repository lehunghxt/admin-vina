import { Get, Post } from '@Helper/ApiHelper'
import { useCallback, useState } from 'react'
import { useUser } from 'Provider/UserProvider'

import { useLoading } from '../../Provider/LoadingProvider';

function Hanoi() {
    const { show, hide } = useLoading();

    const { User } = useUser();
    const [query, setQuery] = useState({ provinceid: '03' })
    const [taxcodes, setTaxcodes] = useState([])
    const [searchtaxcodes, setSearchtaxcodes] = useState([])
    const [taxcode, setTaxcode] = useState('')

    const Periods = [
        { key: 0, text: "Chọn kỳ kế toán" },
        { key: 1, text: "Tháng 1" },
        { key: 2, text: "Tháng 2" },
        { key: 3, text: "Tháng 3" },
        { key: 4, text: "Tháng 4" },
        { key: 5, text: "Tháng 5" },
        { key: 6, text: "Tháng 6" },
        { key: 7, text: "Tháng 7" },
        { key: 8, text: "Tháng 8" },
        { key: 9, text: "Tháng 9" },
        { key: 10, text: "Tháng 10" },
        { key: 11, text: "Tháng 11" },
        { key: 12, text: "Tháng 12" },
        { key: 13, text: "Quí 1" },
        { key: 16, text: "Quí 2" },
        { key: 19, text: "Quí 3" },
        { key: 22, text: "Quí 4" },
    ]

    const handleInputChange = e => {
        setQuery({
            ...query,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    const handlePeriodChange = (e) => {
        var period = e.currentTarget.value
        var currentDate = new Date();
        var fromdate, todate;
        if (period === 0) return;
        if (period > 12) {
            var date = new Date(`${currentDate.getFullYear()}-${(period - 12)}-01`), y = date.getFullYear(), m = date.getMonth();
            fromdate = formatdate(new Date(y, m, 1));
            todate = formatdate(new Date(y, m + 3, 0));
        }
        else {
            var date = new Date(`${currentDate.getFullYear()}-${period}-01`), y = date.getFullYear(), m = date.getMonth();
            fromdate = formatdate(new Date(y, m, 1));
            todate = formatdate(new Date(y, m + 1, 0));
        }
        setQuery({ ...query, fromdate, todate });
    }

    const formatdate = date => {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var date = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${date}`
    }

    const handleSearch = e => {
        setTaxcode(e.currentTarget.value);
        if (taxcode) {
            var st = taxcodes.filter(t => t.Taxcode.startsWith(e.currentTarget.value));
            setSearchtaxcodes(st);
        }
        else setSearchtaxcodes([])
    }

    const handleSelectChange = useCallback(e => {
        var taxcode = taxcodes.find(t => t.Id == e.currentTarget.value)
        if (!taxcode.isRemoved) taxcode.isRemoved = true;
        else taxcode.isRemoved = undefined;
        let items = [...taxcodes];
        items[items.findIndex(t => t.Id === taxcode.Id)] = taxcode;
        setTaxcodes(items)
    }, [taxcodes])

    const handleSubmit = async (e, type) => {
        try {
            e.preventDefault();
            show();
            if (User.UserType !== 1 && !query.taxcode) {
                alert("Vui lòng nhập mã số thuế");
                return false;
            }
            if (!query.fromdate || !query.todate) {
                alert("Ngày không hợp lệ");
                return false;
            }
            query.type = type;
            var data = await Get('taxreport', { params: query });
            if (data.error) {
                alert(data.error);
                return false;
            }
            setTaxcodes(data || []);
            setSearchtaxcodes(data || []);
            hide();
        }
        catch (e) {
            console.log(e);
            hide();
        }
    }
    const handleFormSubmit = async (e, type) => {
        try {
            show();
            e.preventDefault();
            if (User.UserType !== 1 && !query.taxcode) {
                alert("Vui lòng nhập mã số thuế");
                return false;
            }
            if (!query.fromdate || !query.todate) {
                alert("Ngày không hợp lệ");
                return false;
            }
            query.type = type;
            query.customers = searchtaxcodes;
            var data = await Post('taxreport', { params: query, responseType: 'blob' });
            if (data.error) {
                alert(data.error);
                return false;
            }
            const url = data.file;
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.zip');
            document.body.appendChild(link);
            link.click();
            hide();
        }
        catch (e) {
            console.log(e);
            hide();
        }
    }

    return (
        <>
            <div className="card">
                <form onSubmit={e => handleSubmit(e, 1)}>
                    <div className="card-body d-flex">
                        <div className="col-md-3">
                            <label>
                                <b>Mã số thuế</b>
                            </label>
                            <input
                                type="text"
                                name="taxcode"
                                id="taxcode"
                                className="form-control"
                                value={query.taxcode}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label>
                                <b>Từ ngày</b>
                            </label>
                            <input
                                type="date"
                                name="fromdate"
                                id="fromdate"
                                className="form-control"
                                value={query.fromdate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label>
                                <b>Tới ngày</b>
                            </label>
                            <input
                                type="date"
                                name="todate"
                                id="todate"
                                className="form-control"
                                value={query.todate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label>
                                <b>Kỳ kế toán</b>
                            </label>
                            <select className="form-control" onChange={e => handlePeriodChange(e)}>
                                {Periods.map(e => {
                                    return <option key={e.key} value={e.key}>{e.text}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Tìm kiếm</button>
                    </div>
                </form>
            </div>
            <hr />
            <div className="card">
                <div className="card-header d-flex justify-content-end">
                    <label><input type="search" onChange={handleSearch} value={taxcode} className="form-controll" />&nbsp;Tìm <i className="fa fa-search"></i></label>
                </div>
                <form className="w-100" onSubmit={e => handleFormSubmit(e, 2)}>
                    <div className="card-body">
                        <div className="list-taxcodes">
                            <ListTaxcodes
                                taxcodes={searchtaxcodes && searchtaxcodes.length > 0 ? searchtaxcodes : []}
                                callback={handleSelectChange}
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Xuất báo cáo</button>
                    </div>
                </form>
            </div>
        </>
    )
}

const ListTaxcodes = ({ taxcodes, callback }) => {
    return (
        <>
            {
                taxcodes && taxcodes.length > 0 ? taxcodes.map(t => {
                    return <>
                        <span key={t.Id} className={t.type == 1 ? "text-primary" : t.type == 2 ? "text-warning" : "text-danger"}>
                            <input type="checkbox" checked={t.isRemoved ? false : true} id={`check_${t.Id}`} value={t.Id} onClick={e => callback(e)} style={{ marginRight: "0.25em" }} />
                            <label htmlFor={`check_${t.Id}`}>{t.Taxcode}</label>
                        </span>
                    </>
                })
                    : <div className="text-center">Không tìm thấy dữ liệu</div>
            }
        </>
    )
}


export const getServerSideProps = async () => {
    return {
        props: {}
    }
}

export default Hanoi
