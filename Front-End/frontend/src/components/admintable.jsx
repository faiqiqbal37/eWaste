import React from "react";

const AdminTable = ({ itemList, orderList }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {itemList.map((item) => {
              return <th>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => {
            return (
              <tr>
                {Object.entries(order).map(([key, value]) => {
                  return <td>{value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
