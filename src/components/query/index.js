import React, { useState } from 'react';
import CustomDndTables from '@/components/CustomDndTables';
import { Button } from 'antd';
import { initialColumns } from '@/data/queries';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Query = () => {
    const [columns, setColumns] = useState(initialColumns);

    // her bir şablonun kendi datasını güncelle
    const handleColumnsChange = (updatedColumns) => {
        setColumns(updatedColumns);
    };

    const handlePrintColumns = () => {
        console.log(columns);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ display: 'flex', gap: '50px', flexDirection: 'column' }}>
                <CustomDndTables initialColumns={initialColumns} onColumnsChange={handleColumnsChange} />
                <CustomDndTables initialColumns={initialColumns} onColumnsChange={handleColumnsChange} />
                <Button onClick={handlePrintColumns}>Print Columns to Console</Button>
            </div>
        </DndProvider>

    );
};

export default Query;
