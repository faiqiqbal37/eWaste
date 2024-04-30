


const AdminFinanceStats = ({data, amount}) => {
    return (
        <div className="stats stats-vertical lg:stats-horizontal shadow p-5 flex">
          <div className="stat">
            <div className="stat-title">Total Number of Orders</div>
            <div className="stat-value">{data.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Amount Made</div>
            <div className="stat-value">{(amount)*data.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Data Wiping Services</div>
            <div className="stat-value">{data.filter((el)=>el['service']['service_name'] && el['service']['service_name'].includes('Data Wiping')).length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Data Retrieval Services</div>
            <div className="stat-value">{data.filter((el)=>el['service']['service_name'] && el['service']['service_name'].includes('Data Retrieval')).length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Number of Laptops</div>
            <div className="stat-value">{[...new Set(data.filter(el=>el['device_type']==="Laptop"))].length}</div>
          </div>
          <div className="stat mx-auto"> {/* Apply mx-auto class here */}
            <div className="stat-title">Number of Smartphones</div>
            <div className="stat-value">{[...new Set(data.filter(el=>el['device_type']==="Mobile"))].length}</div>
          </div>
        </div>
      );
      
};

export default AdminFinanceStats
