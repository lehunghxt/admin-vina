import React from 'react'
export const getServerSideProps = function ({ req, res }) {
  console.log("Page User Render");
  //console.log(req.sessionStore);
  return {
    props: {},
  };
};
export default function ListUser() {
  return (
    <>
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
                      </tbody>
                    </table>
                  </div>
                </div>
             </div>
            </div>
          </div>
        </div>
    </>
  );
}
