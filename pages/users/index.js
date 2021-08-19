import React from 'react'
export const getServerSideProps = function ({ req, res }) {
  console.log('Page User Render');
  return {
    props: {},
  }
}
export default function ListUser() {
  return (
    <>
      {/* <Layout>
        <h1 className="h3 mb-2 text-gray-800">Tables</h1>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              DataTables Example
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div
                id="dataTable_wrapper"
                className="dataTables_wrapper dt-bootstrap4"
              >
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="dataTables_length" id="dataTable_length">
                      <label>
                        Show
                        <select
                          name="dataTable_length"
                          aria-controls="dataTable"
                          className="custom-select custom-select-sm form-control form-control-sm"
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                        entries
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div id="dataTable_filter" className="dataTables_filter">
                      <label>
                        Search:
                        <input
                          type="search"
                          className="form-control form-control-sm"
                          placeholder=""
                          aria-controls="dataTable"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <table
                      className="table table-bordered dataTable"
                      id="dataTable"
                      width="100%"
                      cellSpacing="0"
                      role="grid"
                      aria-describedby="dataTable_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            className="sorting_asc"
                            tabIndex="0"
                            aria-controls="dataTable"
                            rowSpan="1"
                            colSpan="1"
                            aria-sort="ascending"
                            aria-label="Name: activate to sort column descending"
                            style={{ width: 186.953 }}
                          >
                            Name
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTable"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Position: activate to sort column ascending"
                            style={{ width: 313.438 }}
                          >
                            Position
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTable"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Office: activate to sort column ascending"
                            style={{ width: 136.062 }}
                          >
                            Office
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTable"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Age: activate to sort column ascending"
                            style={{ width: 65.2188 }}
                          >
                            Age
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTable"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Start date: activate to sort column ascending"
                            style={{ width: 131.234 }}
                          >
                            Start date
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="dataTable"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Salary: activate to sort column ascending"
                            style={{ width: 107.094 }}
                          >
                            Salary
                          </th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th rowSpan="1" colSpan="1">
                            Name
                          </th>
                          <th rowSpan="1" colSpan="1">
                            Position
                          </th>
                          <th rowSpan="1" colSpan="1">
                            Office
                          </th>
                          <th rowSpan="1" colSpan="1">
                            Age
                          </th>
                          <th rowSpan="1" colSpan="1">
                            Start date
                          </th>
                          <th rowSpan="1" colSpan="1">
                            Salary
                          </th>
                        </tr>
                      </tfoot>
                      <tbody>
                        <tr role="row" className="odd">
                          <td className="sorting_1">Airi Satou</td>
                          <td>Accountant</td>
                          <td>Tokyo</td>
                          <td>33</td>
                          <td>2008/11/28</td>
                          <td>$162,700</td>
                        </tr>
                        <tr role="row" className="even">
                          <td className="sorting_1">Angelica Ramos</td>
                          <td>Chief Executive Officer (CEO)</td>
                          <td>London</td>
                          <td>47</td>
                          <td>2009/10/09</td>
                          <td>$1,200,000</td>
                        </tr>
                        <tr role="row" className="odd">
                          <td className="sorting_1">Ashton Cox</td>
                          <td>Junior Technical Author</td>
                          <td>San Francisco</td>
                          <td>66</td>
                          <td>2009/01/12</td>
                          <td>$86,000</td>
                        </tr>
                        <tr role="row" className="even">
                          <td className="sorting_1">Bradley Greer</td>
                          <td>Software Engineer</td>
                          <td>London</td>
                          <td>41</td>
                          <td>2012/10/13</td>
                          <td>$132,000</td>
                        </tr>
                        <tr role="row" className="odd">
                          <td className="sorting_1">Brenden Wagner</td>
                          <td>Software Engineer</td>
                          <td>San Francisco</td>
                          <td>28</td>
                          <td>2011/06/07</td>
                          <td>$206,850</td>
                        </tr>
                        <tr role="row" className="even">
                          <td className="sorting_1">Brielle Williamson</td>
                          <td>Integration Specialist</td>
                          <td>New York</td>
                          <td>61</td>
                          <td>2012/12/02</td>
                          <td>$372,000</td>
                        </tr>
                        <tr role="row" className="odd">
                          <td className="sorting_1">Bruno Nash</td>
                          <td>Software Engineer</td>
                          <td>London</td>
                          <td>38</td>
                          <td>2011/05/03</td>
                          <td>$163,500</td>
                        </tr>
                        <tr role="row" className="even">
                          <td className="sorting_1">Caesar Vance</td>
                          <td>Pre-Sales Support</td>
                          <td>New York</td>
                          <td>21</td>
                          <td>2011/12/12</td>
                          <td>$106,450</td>
                        </tr>
                        <tr role="row" className="odd">
                          <td className="sorting_1">Cara Stevens</td>
                          <td>Sales Assistant</td>
                          <td>New York</td>
                          <td>46</td>
                          <td>2011/12/06</td>
                          <td>$145,600</td>
                        </tr>
                        <tr role="row" className="even">
                          <td className="sorting_1">Cedric Kelly</td>
                          <td>Senior Javascript Developer</td>
                          <td>Edinburgh</td>
                          <td>22</td>
                          <td>2012/03/29</td>
                          <td>$433,060</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-5">
                    <div
                      className="dataTables_info"
                      id="dataTable_info"
                      role="status"
                      aria-live="polite"
                    >
                      Showing 1 to 10 of 57 entries
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-7">
                    <div
                      className="dataTables_paginate paging_simple_numbers"
                      id="dataTable_paginate"
                    >
                      <ul className="pagination">
                        <li
                          className="paginate_button page-itpx previous disabled"
                          id="dataTable_previous"
                        >
                          <a
                            href="#"
                            aria-controls="dataTable"
                            data-dt-idx="0"
                            tabIndex="0"
                            className="page-link"
                          >
                            Previous
                          </a>
                        </li>
                        <li className="paginate_button page-itpx active">
                          <a
                            href="#"
                            aria-controls="dataTable"
                            data-dt-idx="1"
                            tabIndex="0"
                            className="page-link"
                          >
                            1
                          </a>
                        </li>
                        <li className="paginate_button page-itpx">
                          <a
                            href="#"
                            aria-controls="dataTable"
                            data-dt-idx="2"
                            tabIndex="0"
                            className="page-link"
                          >
                            2
                          </a>
                        </li>
                        <li className="paginate_button page-itpx">
                          <a
                            href="#"
                            aria-controls="dataTable"
                            data-dt-idx="3"
                            tabIndex="0"
                            className="page-link"
                          >
                            3
                          </a>
                        </li>
                        <li className="paginate_button page-itpx">
                          <a
                            href="#"
                            aria-controls="dataTable"
                            data-dt-idx="4"
                            tabIndex="0"
                            className="page-link"
                          >
                            4
                          </a>
                        </li>
                        <li className="paginate_button page-itpx">
                          <a
                            href="#"
                            aria-controls="dataTable"
                            data-dt-idx="5"
                            tabIndex="0"
                            className="page-link"
                          >
                            5
                          </a>
                        </li>
                        <li className="paginate_button page-itpx">
                          <a
                            href="#"
                            aria-controls="dataTable"
                            data-dt-idx="6"
                            tabIndex="0"
                            className="page-link"
                          >
                            6
                          </a>
                        </li>
                        <li
                          className="paginate_button page-itpx next"
                          id="dataTable_next"
                        >
                          <a
                            href="#"
                            aria-controls="dataTable"
                            data-dt-idx="7"
                            tabIndex="0"
                            className="page-link"
                          >
                            Next
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout> */}
    </>
  );
}
