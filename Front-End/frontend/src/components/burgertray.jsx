import React, { useState } from 'react';

const BurgerTray = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const trayStyle = {
        width: expanded ? '300px' : '200px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'width 0.3s ease',
    };

    const headerStyle = {
        backgroundColor: '#f0f0f0',
        padding: '10px',
        cursor: 'pointer',
    };

    const sectionStyle = {
        marginBottom: '20px',
    };

    return (
        <div style={trayStyle}>
            <div style={headerStyle} onClick={toggleExpand}>
                Burger Tray
            </div>
            <div style={{ padding: '10px' }}>
                <section style={sectionStyle}>
                    <h2>Customers</h2>
                    {/* Add your customer-related content here */}
                </section>
                <section style={sectionStyle}>
                    <h2>Orders</h2>
                    {/* Add your order-related content here */}
                </section>
                <section style={sectionStyle}>
                    <h2>Finances</h2>
                    {/* Add your finance-related content here */}
                </section>
            </div>
        </div>
    );
};

export default BurgerTray;
