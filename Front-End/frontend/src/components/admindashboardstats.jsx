const AdminDashboardStats = ({numberOfStaff, numberOfUsers, numberOfProcessedOrders}) => {
  return (
    <div>
      <div className="stats shadow w-full">
        <div className="stat place-items-center">
          <div className="stat-title">Admins and Staff</div>
          <div className="stat-value">{numberOfStaff}</div>
        </div>

        <div className="stat place-items-center ">
          <div className="stat-title">Users</div>
          <div className="stat-value">{numberOfUsers}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Processed Orders</div>
          <div className="stat-value">{numberOfProcessedOrders}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardStats;