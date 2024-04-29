const AdminFinanceCollapseComponent = ({ data, amount }) => {
  return (
    <div className="collapse bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium text-center">
        Show Orders
      </div>
      <div className="collapse-content">
        <table className="table">
          <thead>
            <tr>
              <th>Device Image</th>
              <th>Name</th>
              <th>Device</th>
              <th>Service Type</th>
              <th>Order ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img
                          src={
                            order["photos"] && order["photos"].length > 0
                              ? order["photos"][0]
                              : "https://placehold.co/600x400"
                          }
                          alt=""
                        ></img>
                      </div>
                    </div>
                  </td>
                  <td>{order["name"]}</td>
                  <td>{order["device_name"]}</td>
                  <td>{order["service"]["service_name"]}</td>
                  <td>{order["order_id"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="divider"></div>
        <div className="flex justify-between text-xl font-medium">
          <div className="ml-3">Total:</div>
          <div className="mr-3 text-green">{amount * data.length}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminFinanceCollapseComponent;
