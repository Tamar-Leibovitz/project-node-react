import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Steps } from 'primereact/steps';
import { CustomerService } from './CustomerService';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);

    useEffect(() => {
        CustomerService.getOrders().then((data) => setOrders(data));
    }, []);

    const productTemplate = (rowData) => {
        const products = rowData.products || [];

        return (
            <div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>תמונה</th>
                            <th>שם המוצר</th>
                            <th>כמות</th>
                            <th>מחיר</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>
                                    <img alt={product.name} src={product.image} width="32" />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>₪{product.price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="total-price">
                    <strong>סה"כ מחיר: ₪{rowData.total.toFixed(2)}</strong>
                </div>
            </div>
        );
    };

    const headerTemplate = (data) => {
        return (
            <div className="header-content">
                <strong>תאריך: {data.date}</strong><br></br>
                <Tag value={data.status} severity={getSeverity(data.status)} className="order-status" />
            </div>
        );
    };

    const getSeverity = (status) => {
        switch (status) {
            case 'personal':
                return 'info';
            case 'reservation':
                return 'warning';
            case 'review':
                return 'success';
            default:
                return null;
        }
    };

    return (
        <div className="card rtl-container">
            <DataTable value={orders} rowGroupMode="subheader" groupRowsBy="date"
                sortMode="single" sortField="date" sortOrder={1}
                expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                rowGroupHeaderTemplate={headerTemplate} tableStyle={{ minWidth: '50rem' }}>
                <Column expander style={{ width: '3em' }} />
                <Column field="status" header="סטטוס" body={(rowData) => (
                    <div>
                        <Tag value={rowData.status} severity={getSeverity(rowData.status)} className="order-status" />
                        <Steps model={[{ label: 'Personal Info' }, { label: 'Reservation' }, { label: 'Review' }]} activeIndex={rowData.status === 'personal' ? 0 : rowData.status === 'reservation' ? 1 : 2} className="custom-steps" />
                    </div>
                )} />
                <Column field="products" header="פרטי ההזמנה" body={productTemplate} style={{ width: '75%' }}></Column>
            </DataTable>
        </div>
    );
}